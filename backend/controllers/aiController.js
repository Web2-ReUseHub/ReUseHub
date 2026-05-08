const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateDescription = async (req, res) => {
    try {
        const { title, category, condition, imageBase64 } = req.body;

        if (!imageBase64) {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "أنت مساعد خبير في كتابة إعلانات المنتجات المستعملة بالعربية."
                    },
                    {
                        role: "user",
                        content: `اكتب وصفاً جذاباً لمنتج: ${title}، فئة: ${category}، حالة: ${condition}.`
                    }
                ],
                model: "llama-3.3-70b-versatile",
            });

            return res.json({
                success: true,
                result: chatCompletion.choices[0]?.message?.content
            });
        }

        const visionCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `حلل هذه الصورة واكتب وصفاً تسويقياً احترافياً بالعربية لمنتج اسمه "${title}". ركز على ما تراه في الصورة من نظافة، لون، وتفاصيل.`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${imageBase64}`
                            }
                        }
                    ]
                }
            ],
            model: "llama-3.2-11b-vision-preview",
        });

        return res.json({
            success: true,
            result: visionCompletion.choices[0]?.message?.content || "فشل تحليل الصورة"
        });

    } catch (error) {
        console.error("AI Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "حدث خطأ في الـ AI"
        });
    }
};

module.exports = { generateDescription };