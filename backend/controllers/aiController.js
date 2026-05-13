const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateDescription = async (req, res) => {
  try {
    const { title, category, condition, price, imageBase64 } = req.body;

    let messages;

    if (imageBase64) {
      // ✅ مع صورة — يحلل الصورة ويطلع مواصفات + وصف
      messages = [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
            {
              type: "text",
              text: `أنت خبير في كتابة إعلانات المنتجات المستعملة باللغة العربية.

حلّل هذه الصورة واكتب وصفاً تسويقياً احترافياً للمنتج.

بيانات المنتج:
- العنوان: ${title}
- التصنيف: ${category}
- الحالة: ${condition}
- السعر: ${price ? price + " شيكل" : "لم يحدد"}

التعليمات:
- استخرج المواصفات الواضحة من الصورة (اللون، الحجم، الماركة، الحالة...)
- اذكر السعر ${price ? price + " شيكل" : ""} في الوصف بشكل طبيعي
- اكتب وصفاً جذاباً من 3 إلى 5 أسطر
- شجّع المشتري على التواصل
- لا تذكر أنك ذكاء اصطناعي`,
            },
          ],
        },
      ];
    } else {
      // ✅ بدون صورة — يولد وصف من العنوان فقط
      messages = [
        {
          role: "system",
          content: "أنت خبير محترف في كتابة إعلانات المنتجات المستعملة باللغة العربية.",
        },
        {
          role: "user",
          content: `اكتب وصفاً تسويقياً احترافياً لمنتج مستعمل للبيع.

بيانات المنتج:
- العنوان: ${title}
- التصنيف: ${category}
- الحالة: ${condition}
- السعر: ${price ? price + " شيكل" : "لم يحدد"}

التعليمات:
- اذكر السعر ${price ? price + " شيكل" : ""} في الوصف بشكل طبيعي
- اكتب وصفاً واقعياً ومقنعاً من 3 إلى 5 أسطر
- ركّز على جودة المنتج وحالته
- شجّع المشتري على التواصل
- لا تذكر أنك ذكاء اصطناعي`,
        },
      ];
    }

    const completion = await groq.chat.completions.create({
      messages,
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.7,
    });

    const result =
        completion.choices[0]?.message?.content ||
        "منتج بحالة ممتازة ومناسب للاستخدام اليومي. للتواصل والاستفسار يرجى المراسلة.";

    return res.json({ success: true, result });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "حدث خطأ في الذكاء الاصطناعي.",
    });
  }
};

module.exports = { generateDescription };