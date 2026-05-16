const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function createEmbedding(text) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  const embedding = response?.data?.[0]?.embedding;
  if (!embedding) {
    throw new Error("Failed to create embedding.");
  }

  return embedding;
}

module.exports = { createEmbedding };
