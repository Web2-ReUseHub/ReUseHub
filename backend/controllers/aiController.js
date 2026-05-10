const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateDescription = async (req, res) => {
  try {
    const { title, category, condition } = req.body;

    const prompt = `
اكتب وصفاً تسويقياً احترافياً وجذاباً باللغة العربية لمنتج مستعمل سيتم عرضه للبيع.

بيانات المنتج:
- العنوان: ${title}
- التصنيف: ${category}
- الحالة: ${condition}

التعليمات:
- اكتب وصفاً واقعيًا ومقنعًا.
- ركّز على جودة المنتج وحالته الجيدة.
- اذكر أنه مناسب للاستخدام اليومي.
- شجّع المشتري على التواصل.
- لا تقل أنك لا تستطيع رؤية الصورة.
- لا تذكر أنك نموذج ذكاء اصطناعي.
- اجعل الوصف من 2 إلى 4 أسطر.
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "أنت خبير محترف في كتابة إعلانات المنتجات المستعملة باللغة العربية.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const result =
      completion.choices[0]?.message?.content ||
      "منتج بحالة ممتازة ومناسب للاستخدام اليومي. للتواصل والاستفسار يرجى المراسلة.";

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "حدث خطأ في الذكاء الاصطناعي.",
    });
  }
};

module.exports = { generateDescription };