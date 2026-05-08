const db = require('../models');
const { UsedItem, Category, ProImg } = db;

exports.createUsedItem = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is missing or invalid JSON.' });
    }

    const { status, description, price, seller_id, cat_id } = req.body;
    const item = await UsedItem.create({ status, description, price, seller_id, cat_id });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsedItems = async (req, res) => {
  try {
    console.log("✅ getUsedItems function called");
    console.log("📦 UsedItem model:", UsedItem);
    const items = await UsedItem.findAll();
    console.log("📋 Items found:", items);
    res.json(items);
  } catch (error) {
    console.error("❌ Error in getUsedItems:", error.message);
    console.error("📍 Error stack:", error.stack);
    res.status(500).json({ error: error.message });
  }
};


exports.updateUsedItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await UsedItem.update(req.body, { where: { used_item_id: id } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUsedItem = async (req, res) => {
  try {
    const { id } = req.params;
    await UsedItem.destroy({ where: { used_item_id: id } });
    res.json({ message: 'Used item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const analyzeItemImage = async (req, res) => {
  try {
    const { imageBase64, mediaType, price, location, hasDelivery, phone } = req.body;

    // validation
    if (!imageBase64 || !price || !location) {
      return res.status(400).json({
        error: 'imageBase64 و price و location مطلوبة'
      });
    }

const systemPrompt = `أنت مساعد ذكي متخصص في تحليل صور المنتجات وكتابة إعلانات بيع.
حلّل الصورة وأعد ردك بصيغة JSON فقط بدون أي نص خارجه:
{
  "category": "فئة المنتج",
  "title": "عنوان إعلان جذاب 5-8 كلمات",
  "description": "فقرة وصف مقنعة 2-3 جمل تذكر السعر والتوصيل والموقع",
  "tags": ["وسم1", "وسم2", "وسم3"]
}
اكتب بالعربية وكن احترافياً.`;

    const userPrompt = `حلّل هذه الصورة واكتب إعلان بيع:
- السعر: ${price}
- التوصيل: ${hasDelivery ? 'متوفر' : 'غير متوفر'}
- الموقع: ${location}${phone ? `\n- رقم التواصل: ${phone}` : ''}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64
              }
            },
            { type: 'text', text: userPrompt }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(502).json({
        error: 'Anthropic API error',
        details: errData?.error?.message
      });
    }

    const data = await response.json();
    const rawText = data.content
      .map(b => b.text || '')
      .join('')
      .replace(/```json|```/g, '')
      .trim();

    const parsed = JSON.parse(rawText);
    res.status(200).json(parsed);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.analyzeItemImage = analyzeItemImage;