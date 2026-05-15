const express = require("express");
const { pool } = require("../database");
const { createEmbedding } = require("../services/embeddings");
const { cosineSimilarity } = require("../utils/similarity");

const router = express.Router();

// ── helpers ──────────────────────────────────────────────────────────────────

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === "string")
    return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

function parseJsonValue(value, fallback) {
  if (value == null) return fallback;
  if (Array.isArray(value) || typeof value === "object") return value;
  if (typeof value === "string") {
    try { return JSON.parse(value); } catch { return fallback; }
  }
  return fallback;
}

function parseTitleAndBody(description = "") {
  const text = String(description || "").trim();
  const titleMatch = text.match(/العنوان:\s*([^\n\r]+)/i);
  const bodyMatch = text.match(/الوصف:\s*([\s\S]+)/i);

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    body: bodyMatch ? bodyMatch[1].trim() : (titleMatch ? text.replace(titleMatch[0], "").trim() : text),
  };
}

/**
 * The text we embed for a product at insert time.
 * We must embed the *search query* in the same "shape" so the vectors are
 * comparable — the query is treated as a mini-product description.
 */
function buildEmbeddingText({ name, description, tags }) {
  const tagsText = tags.length ? `Tags: ${tags.join(", ")}` : "Tags: none";
  return `${name}\n${description}\n${tagsText}`;
}

/**
 * Tag-overlap boost (0–1).
 * Rewards results whose tags share words with the query.
 */
function tagBoost(queryTokens, productTags) {
  if (!productTags.length || !queryTokens.size) return 0;
  let hits = 0;
  for (const tag of productTags) {
    const tagWords = tag.toLowerCase().split(/\s+/);
    if (tagWords.some((w) => queryTokens.has(w))) hits++;
  }
  return hits / productTags.length;
}

/**
 * Keyword-in-name/description boost (0–1).
 * Exact word matches in the most prominent fields deserve a nudge.
 */
function keywordBoost(queryTokens, name, description) {
  const haystack = `${name} ${description}`.toLowerCase().split(/\W+/);
  const haystackSet = new Set(haystack);
  let hits = 0;
  for (const token of queryTokens) {
    if (haystackSet.has(token)) hits++;
  }
  return queryTokens.size ? hits / queryTokens.size : 0;
}

/** Stopwords to ignore when tokenising the query */
const STOPWORDS = new Set([
  "a","an","the","is","it","in","of","to","and","or","for","on","at",
  "with","this","that","be","are","was","were","do","does","did","have",
  "has","had","i","my","your","we","they","he","she","can","will","would",
  "could","should","not","no","but","so","if","as","by","from","up","about",
]);

function tokeniseQuery(query) {
  return new Set(
    query
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w))
  );
}

// ── routes ───────────────────────────────────────────────────────────────────

router.post("/used_items", async (req, res) => {
  try {
    const { description, price, status, seller_id, cat_id, tags } = req.body || {};
    const cleanDescription = typeof description === "string" ? description.trim() : "";

    if (!cleanDescription || price === undefined || !status || !seller_id || !cat_id) {
      return res.status(400).json({ error: "Description, price, status, seller_id, and cat_id are required." });
    }

    const cleanTags = normalizeTags(tags);
    const embedText = buildEmbeddingText({
      name: cleanDescription,
      description: cleanDescription,
      tags: cleanTags,
    });
    const embedding = await createEmbedding(embedText);

    const [result] = await pool.query(
      "INSERT INTO used_items (description, price, status, seller_id, cat_id, embedding) VALUES (?, ?, ?, ?, ?, ?)",
      [cleanDescription, price, status, seller_id, cat_id, JSON.stringify(embedding)]
    );

    return res.status(201).json({
      id: result.insertId,
      description: cleanDescription,
      price,
      status,
      seller_id,
      cat_id,
      tags: cleanTags,
    });
  } catch (error) {
    console.error("Add product failed:", error);
    return res.status(500).json({ error: error.message || "Failed to add product." });
  }
});

router.get("/used_items", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, description, price, status, seller_id, cat_id, tags FROM used_items ORDER BY id DESC"
    );
    const products = rows.map((row) => ({
      id: row.id,
      description: row.description,
      price: row.price,
      status: row.status,
      seller_id: row.seller_id,
      cat_id: row.cat_id,
      tags: parseJsonValue(row.tags, []),
    }));
    return res.json({ products });
  } catch (error) {
    console.error("Fetch products failed:", error);
    return res.status(500).json({ error: error.message || "Failed to fetch products." });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body || {};
    const cleanQuery = typeof query === "string" ? query.trim() : "";

    if (!cleanQuery) {
      return res.status(400).json({ error: "Query is required." });
    }

    const terms = cleanQuery.split(/\s+/).filter(Boolean);
    const conditions = terms
      .map(() => `(ui.description LIKE ? OR ui.status LIKE ?)`)
      .join(" OR ");
    const params = [];
    for (const term of terms) {
      const likeTerm = `%${term}%`;
      params.push(likeTerm, likeTerm);
    }

    const [rows] = await pool.query(
      `SELECT ui.used_item_id, ui.description, ui.price, ui.status, ui.seller_id, ui.cat_id, ui.created_at, pi.img_url
       FROM used_item ui
       LEFT JOIN pro_img pi ON ui.used_item_id = pi.used_item_id
       WHERE ${conditions}
       ORDER BY ui.used_item_id DESC`,
      params
    );

    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.used_item_id]) {
        grouped[row.used_item_id] = {
          used_item_id: row.used_item_id,
          description: row.description,
          price: row.price,
          status: row.status,
          seller_id: row.seller_id,
          cat_id: row.cat_id,
          created_at: row.created_at,
          images: [],
        };
      }
      if (row.img_url) {
        grouped[row.used_item_id].images.push({ img_url: row.img_url });
      }
    }

    const results = Object.values(grouped);
    return res.json({ results });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ error: error.message || "Search failed." });
  }
});

module.exports = router;
