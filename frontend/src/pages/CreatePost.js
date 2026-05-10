import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



import axios from "axios";

const API_BASE_URL = "http://localhost:5004";

const MAX_IMAGES = 5;
const API_URL = "http://localhost:5004/used-items";
const AI_URL = "http://localhost:5004/ai/generate-post";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("لابتوب");
  const [selectedCondition, setSelectedCondition] = useState("جديد");
  const [priceNegotiable, setPriceNegotiable] = useState(true);
  const [shippingAvailable, setShippingAvailable] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const categories = ["لابتوب", "سماعات", "ساعة ذكية", "ملابس", "أحذية", "حقائب", "أخرى"];
  const conditions = ["جديد", "مستعمل - ممتاز", "مستعمل - جيد"];
  const handleSubmit = async () => {
  try {
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
      navigate("/login");
      return;
    }

    if (!title.trim()) {
      alert("يرجى إدخال عنوان المنتج");
      return;
    }

    if (!description.trim()) {
      alert("يرجى إدخال وصف المنتج");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("يرجى إدخال سعر صحيح");
      return;
    }

    // جلب المستخدم الحالي للحصول على user_id
    const profileResponse = await axios.get(
      `${API_BASE_URL}/user/profile/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const seller_id = profileResponse.data.user.user_id;

    // دمج العنوان مع الوصف لأن قاعدة البيانات لا تحتوي على title
    const finalDescription =
      `العنوان: ${title}\n\nالوصف: ${description}`;

    // مؤقتاً نستخدم cat_id ثابت
    const cat_id = 1;

    // إنشاء المنتج
    await axios.post(
      `${API_BASE_URL}/used-items`,
      {
        status: selectedCondition,
        description: finalDescription,
        price: parseFloat(price),
        seller_id,
        cat_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("تم نشر المنتج بنجاح!");

    // تنظيف الحقول
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity(1);
    setSelectedCategory("لابتوب");
    setSelectedCondition("جديد");
    setPriceNegotiable(true);
    setShippingAvailable(true);
    setShowPhone(false);

    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setImages([]);

    // العودة إلى صفحة البروفايل
    navigate("/profile");
  } catch (error) {
    console.error("Error creating post:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "حدث خطأ أثناء إنشاء المنتج";

    alert(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  const categoryMap = {
    "لابتوب": 1, "سماعات": 2, "ساعة ذكية": 3,
    "ملابس": 4, "أحذية": 5, "حقائب": 6, "أخرى": 7
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const availableSlots = MAX_IMAGES - images.length;
    const selectedFiles = files.slice(0, availableSlots);
    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const removeImage = (index) => {
    setImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleGenerateAI = async () => {
    if (!title.trim()) return setError("اكتب عنوان المنتج أولاً عشان الـ AI يولّد وصف");
    setError("");
    setAiLoading(true);

    try {
      let imageBase64 = null;

      if (images.length > 0) {
        const file = images[0].file;
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const response = await fetch(AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: selectedCategory,
          condition: selectedCondition,
          imageBase64: imageBase64
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "فشل الـ AI");

      setDescription(data.result);
    } catch (err) {
      setError("فشل توليد الوصف: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!title.trim()) return setError("يرجى إدخال عنوان المنتج");
    if (!description.trim()) return setError("يرجى إدخال وصف المنتج");
    if (!price || isNaN(price) || Number(price) <= 0) return setError("يرجى إدخال سعر صحيح");

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          price: Number(price),
          quantity: Number(quantity),
          status: selectedCondition,
          cat_id: categoryMap[selectedCategory] || 7,
          seller_id: 1,
          price_negotiable: priceNegotiable,
          shipping_available: shippingAvailable,
          show_phone: showPhone
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "حدث خطأ أثناء النشر");

      alert("✅ تم نشر المنتج بنجاح!");
      navigate("/profile");
    } catch (err) {
      setError(err.message || "تعذّر الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={page}>
        <div style={card}>
          <button
              className="btn position-absolute top-0 start-0 m-3 rounded-circle shadow d-flex align-items-center justify-content-center"
              style={{ width: 48, height: 48, backgroundColor: "#1a2a5e", border: "none", zIndex: 10 }}
              onClick={() => navigate("/profile")}
          >
            <i className="bi bi-arrow-left" style={{ color: "white", fontSize: 18 }} />
          </button>

          <div style={headerBlock}>
            <h2 style={titleStyle}>إنشاء منشور جديد</h2>
            <p style={subtitle}>رتّب بيانات المنتج بشكل واضح، وأضف صوراً جذابة لتزيد فرصة البيع بشكل أسرع.</p>
          </div>

          <div style={formGrid}>

            <div style={fieldBlock}>
              <label style={label}>عنوان المنتج</label>
              <input
                  placeholder="مثال: لابتوب Dell Latitude بحالة ممتازة"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={input}
              />
            </div>

            <div style={fieldBlock}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={label}>وصف المنتج</label>
                <button type="button" onClick={handleGenerateAI} style={aiBtn} disabled={aiLoading}>
                  {aiLoading ? "⏳ جارٍ التوليد..." : "✨ توليد بالـ AI"}
                </button>
              </div>
              <textarea
                  placeholder="اذكر الحالة، المواصفات، سبب البيع، وأي تفاصيل مهمة للمشتري."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={textarea}
              />
              {images.length > 0 && (
                  <p style={{ fontSize: 12, color: "#6a7b98", margin: "4px 0 0" }}>
                    💡 الـ AI سيحلل الصورة الأولى تلقائياً
                  </p>
              )}
            </div>

            <div style={uploadSection}>
              <div style={uploadHeader}>
                <div>
                  <h3 style={sectionTitle}>صور المنتج</h3>
                  <p style={sectionHint}>يمكنك رفع حتى {MAX_IMAGES} صور. يفضّل اختيار صور واضحة ومضيئة.</p>
                </div>
                <span style={counterBadge}>{images.length}/{MAX_IMAGES}</span>
              </div>

              <div onClick={openFilePicker} style={uploadBox} role="button" tabIndex={0}>
                <div style={uploadIcon}>+</div>
                <div style={uploadTextWrap}>
                  <strong style={uploadTitle}>اسحب الصور هنا أو اضغط للاختيار</strong>
                  <span style={uploadSubtitle}>PNG, JPG, WEBP - الصورة الأولى ستظهر كصورة رئيسية للإعلان</span>
                </div>
                <button type="button" style={uploadAction}>اختيار الصور</button>
              </div>

              <input
                  type="file" multiple accept="image/*"
                  ref={fileInputRef} onChange={handleImageChange}
                  style={{ display: "none" }}
              />

              {images.length > 0 && (
                  <div style={imageGrid}>
                    {images.map((img, index) => (
                        <div key={img.preview} style={imageCard}>
                          {index === 0 && <span style={mainImageBadge}>الرئيسية</span>}
                          <img src={img.preview} alt={`صورة المنتج ${index + 1}`} style={previewImg} />
                          <button type="button" onClick={() => removeImage(index)} style={removeBtn}>حذف</button>
                        </div>
                    ))}
                  </div>
              )}
            </div>

            <div style={twoColumnRow}>
              <div style={fieldBlock}>
                <label style={label}>السعر</label>
                <input
                    type="number" min="0" placeholder="أدخل السعر"
                    value={price} onChange={(e) => setPrice(e.target.value)} style={input}
                />
              </div>
              <div style={fieldBlock}>
                <label style={label}>الكمية</label>
                <input
                    type="number" min="1" placeholder="1"
                    value={quantity} onChange={(e) => setQuantity(e.target.value)} style={input}
                />
              </div>
            </div>

            <div style={sectionCard}>
              <div style={sectionHeadingRow}>
                <h3 style={sectionTitle}>التصنيف</h3>
                <span style={helperText}>اختر الفئة الأقرب لمنتجك</span>
              </div>
              <div style={chipGroup}>
                {categories.map((category) => (
                    <button key={category} type="button"
                            onClick={() => setSelectedCategory(category)}
                            style={selectedCategory === category ? activeChip : chip}>
                      {category}
                    </button>
                ))}
              </div>
            </div>

            <div style={sectionCard}>
              <div style={sectionHeadingRow}>
                <h3 style={sectionTitle}>الحالة</h3>
                <span style={helperText}>كلما كان الوصف دقيقاً زادت الثقة</span>
              </div>
              <div style={chipGroup}>
                {conditions.map((condition) => (
                    <button key={condition} type="button"
                            onClick={() => setSelectedCondition(condition)}
                            style={selectedCondition === condition ? activeChip : chip}>
                      {condition}
                    </button>
                ))}
              </div>
            </div>

            <div style={toggleCard}>
              <Toggle text="السعر قابل للتفاوض" value={priceNegotiable} setValue={setPriceNegotiable} />
              <Toggle text="الشحن متاح" value={shippingAvailable} setValue={setShippingAvailable} />
              <Toggle text="إظهار رقم الهاتف" value={showPhone} setValue={setShowPhone} />
            </div>

            {error && (
                <div style={errorBox}>⚠️ {error}</div>
            )}

            <button type="button" onClick={handleSubmit}
                    style={{ ...submitBtn, opacity: loading ? 0.7 : 1 }}
                    disabled={loading}>
              {loading ? "جارٍ النشر..." : "نشر المنتج"}
            </button>

          </div>


          <div style={twoColumnRow}>
            <div style={fieldBlock}>
              <label style={label}>السعر</label>
              <input
                type="number"
                min="0"
                placeholder="أدخل السعر"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={input}
              />
            </div>

            <div style={fieldBlock}>
              <label style={label}>الكمية</label>
              <input
                type="number"
                min="1"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={input}
              />
            </div>
          </div>

          <div style={sectionCard}>
            <div style={sectionHeadingRow}>
              <h3 style={sectionTitle}>التصنيف</h3>
              <span style={helperText}>اختر الفئة الأقرب لمنتجك</span>
            </div>
            <div style={chipGroup}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  style={selectedCategory === category ? activeChip : chip}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div style={sectionCard}>
            <div style={sectionHeadingRow}>
              <h3 style={sectionTitle}>الحالة</h3>
              <span style={helperText}>كلما كان الوصف دقيقاً زادت الثقة</span>
            </div>
            <div style={chipGroup}>
              {conditions.map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => setSelectedCondition(condition)}
                  style={selectedCondition === condition ? activeChip : chip}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          <div style={toggleCard}>
            <Toggle text="السعر قابل للتفاوض" value={priceNegotiable} setValue={setPriceNegotiable} />
            <Toggle text="الشحن متاح" value={shippingAvailable} setValue={setShippingAvailable} />
            <Toggle text="إظهار رقم الهاتف" value={showPhone} setValue={setShowPhone} />
          </div>

          <button
  type="button"
  style={submitBtn}
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? "جاري النشر..." : "نشر المنتج"}
</button>
 
        </div>
      </div>
  );
}

function Toggle({ text, value, setValue }) {
  return (
      <div style={toggleRow}>
        <div><span style={toggleLabel}>{text}</span></div>
        <button type="button" onClick={() => setValue(!value)} style={value ? toggleOn : toggleOff}>
          <span style={{ ...circle, right: value ? "29px" : "4px" }} />
        </button>
      </div>
  );
}

const page = { direction: "rtl", minHeight: "100vh", padding: "32px 20px", background: "linear-gradient(180deg, #f5f7fb 0%, #eef2f8 100%)" };
const card = { maxWidth: "680px", margin: "0 auto", padding: "30px", borderRadius: "28px", background: "#ffffff", border: "1px solid #dbe3f0", boxShadow: "0 20px 55px rgba(19, 42, 90, 0.10)", position: "relative" };
const headerBlock = { marginBottom: "26px" };
const titleStyle = { margin: 0, color: "#102a56", fontSize: "30px", fontWeight: 800 };
const subtitle = { margin: "10px 0 0", color: "#60708d", fontSize: "15px", lineHeight: 1.8 };
const formGrid = { display: "grid", gap: "18px" };
const fieldBlock = { display: "grid", gap: "8px" };
const label = { color: "#18345f", fontSize: "14px", fontWeight: 700 };
const input = { width: "100%", padding: "15px 16px", borderRadius: "16px", border: "1.5px solid #d4deed", background: "#fbfcff", color: "#17325c", fontSize: "15px", outline: "none", boxSizing: "border-box" };
const textarea = { ...input, minHeight: "132px", resize: "vertical", lineHeight: 1.8 };
const uploadSection = { padding: "20px", borderRadius: "22px", background: "#f8fbff", border: "1px solid #d8e3f2" };
const uploadHeader = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "14px", marginBottom: "16px", flexWrap: "wrap" };
const sectionTitle = { margin: 0, color: "#112c5b", fontSize: "18px", fontWeight: 800 };
const sectionHint = { margin: "6px 0 0", color: "#6a7b98", fontSize: "13px", lineHeight: 1.7 };
const counterBadge = { minWidth: "62px", textAlign: "center", padding: "8px 12px", borderRadius: "999px", background: "#ffffff", border: "1px solid #d5e1f1", color: "#183a70", fontWeight: 800 };
const uploadBox = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", padding: "20px", borderRadius: "20px", border: "2px dashed #9db3d8", background: "linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)", cursor: "pointer" };
const uploadIcon = { width: "50px", height: "50px", display: "grid", placeItems: "center", borderRadius: "16px", background: "#16366b", color: "#ffffff", fontSize: "28px", fontWeight: 700, flexShrink: 0 };
const uploadTextWrap = { flex: "1 1 260px", display: "grid", gap: "6px" };
const uploadTitle = { color: "#16315d", fontSize: "16px" };
const uploadSubtitle = { color: "#6d7f9f", fontSize: "13px", lineHeight: 1.7 };
const uploadAction = { padding: "12px 18px", borderRadius: "14px", border: "none", background: "#16366b", color: "#ffffff", fontSize: "14px", fontWeight: 700, cursor: "pointer", flexShrink: 0 };
const imageGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "14px", marginTop: "16px" };
const imageCard = { position: "relative", overflow: "hidden", borderRadius: "18px", background: "#ffffff", border: "1px solid #d8e2f0", padding: "8px" };
const previewImg = { width: "100%", height: "120px", objectFit: "cover", borderRadius: "14px", display: "block" };
const mainImageBadge = { position: "absolute", top: "14px", right: "14px", zIndex: 1, padding: "6px 10px", borderRadius: "999px", background: "rgba(17, 44, 91, 0.92)", color: "#ffffff", fontSize: "11px", fontWeight: 700 };
const removeBtn = { marginTop: "8px", width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid #e2e8f3", background: "#f7f9fc", color: "#17325c", fontSize: "13px", fontWeight: 700, cursor: "pointer" };
const twoColumnRow = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" };
const sectionCard = { padding: "18px", borderRadius: "20px", background: "#ffffff", border: "1px solid #dbe4f1" };
const sectionHeadingRow = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" };
const helperText = { color: "#7787a2", fontSize: "13px" };
const chipGroup = { display: "flex", gap: "12px", flexWrap: "wrap" };
const chip = { padding: "12px 20px", borderRadius: "999px", border: "2px solid #1a3970", background: "#ffffff", color: "#18335f", fontSize: "15px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease" };
const activeChip = { ...chip, background: "#1a3970", color: "#ffffff", boxShadow: "0 10px 20px rgba(26, 57, 112, 0.18)" };
const toggleCard = { padding: "10px 18px", borderRadius: "20px", background: "#f8fbff", border: "1px solid #d9e4f2" };
const toggleRow = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 0" };
const toggleLabel = { color: "#18345f", fontSize: "15px", fontWeight: 700 };
const toggleOn = { width: "58px", height: "30px", borderRadius: "999px", border: "none", background: "#16366b", position: "relative", cursor: "pointer" };
const toggleOff = { ...toggleOn, background: "#c8d3e2" };
const circle = { width: "24px", height: "24px", borderRadius: "50%", background: "#ffffff", position: "absolute", top: "3px", transition: "all 0.2s ease" };
const submitBtn = { width: "100%", padding: "16px 20px", borderRadius: "18px", border: "none", background: "linear-gradient(135deg, #16366b 0%, #244c8f 100%)", color: "#ffffff", fontSize: "18px", fontWeight: 800, cursor: "pointer", boxShadow: "0 18px 35px rgba(22, 54, 107, 0.22)" };
const errorBox = { padding: "12px 16px", borderRadius: "12px", background: "#fff0f0", border: "1px solid #ffcccc", color: "#cc0000", fontSize: "14px", fontWeight: 600 };
const aiBtn = { padding: "8px 16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #c9a84c 0%, #e2c06a 100%)", color: "#1a2744", fontSize: "13px", fontWeight: 700, cursor: "pointer" };

export default CreatePost;