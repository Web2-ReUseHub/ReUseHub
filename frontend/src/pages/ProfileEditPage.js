import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const NAVY = "#1B2B5E";
const GOLD = "#C9A84C";
const LIGHT_BG = "#F5F6FA";
const CARD_BG = "#FFFFFF";
const BORDER = "#E0E4EF";
const TEXT_MAIN = "#1B2B5E";
const TEXT_MUTED = "#7A849A";

export default function ProfileEditPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("أحمد محسن");
    const [username, setUsername] = useState("ahmed.mohsen");
    const [phone, setPhone] = useState("+970 59 123 4567");
    const [city, setCity] = useState("رام الله");
    const [bio, setBio] = useState("بائع موثوق في منصة ReUseHub. أبيع إلكترونيات ومفروشات بحالة ممتازة.");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saved, setSaved] = useState(false);
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef();

    const handleImageChange = (file) => {
        if (!file) return;
        setAvatar(file);
        const reader = new FileReader();
        reader.onload = (e) => setAvatarPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) handleImageChange(file);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div
            dir="rtl"
            style={{
                minHeight: "100vh",
                background: LIGHT_BG,
                fontFamily: "'Segoe UI', 'Tahoma', Arial, sans-serif",
                direction: "rtl",
            }}
        >
             <button
            className="btn position-absolute top-0 start-0 m-3 rounded-circle shadow d-flex align-items-center justify-content-center"
            style={{ width: 48, height: 48, backgroundColor: "#1a2a5e", border: "none", zIndex: 10 }}
            onClick={() => navigate("/profile")}
          >
            <i className="bi bi-arrow-left" style={{ color: "white", fontSize: 18 }} />
          </button>
            {/* Navbar 
            <nav
                style={{
                    background: CARD_BG,
                    borderBottom: `1px solid ${BORDER}`,
                    padding: "0 32px",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    boxShadow: "0 2px 8px rgba(27,43,94,0.07)",
                }}
            >
           
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
              style={{
                  fontWeight: 800,
                  fontSize: 22,
                  color: NAVY,
                  letterSpacing: "-0.5px",
              }}
          >
            ReUseHub
          </span>
                </div>
                <div style={{ display: "flex", gap: 28, color: NAVY, fontSize: 15, fontWeight: 500 }}>
                    <span style={{ cursor: "pointer", opacity: 0.7 }}>الرئيسية</span>
                    <span style={{ cursor: "pointer", opacity: 0.7 }}>المنتجات</span>
                    <span style={{ cursor: "pointer", opacity: 0.7 }}>تواصل معنا</span>
                </div>
                <button
                    style={{
                        background: NAVY,
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "9px 22px",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                    }}
                >
                    ابدأ الآن
                </button>
            </nav>
                  */}
            {/* Page Content */}
            <div style={{ maxWidth: 780, margin: "40px auto", padding: "0 20px 60px" }}>
                {/* Page Title */}
                <div style={{ marginBottom: 28 }}>
                    <h1
                        style={{
                            color: NAVY,
                            fontSize: 26,
                            fontWeight: 800,
                            margin: 0,
                            marginBottom: 4,
                        }}
                    >
                        تعديل الملف الشخصي
                    </h1>
                    <p style={{ color: TEXT_MUTED, margin: 0, fontSize: 14 }}>
                        حدّث معلوماتك الشخصية وصورة ملفك الشخصي
                    </p>
                </div>

                {/* Avatar Section */}
                <div
                    style={{
                        background: CARD_BG,
                        borderRadius: 16,
                        border: `1px solid ${BORDER}`,
                        padding: "28px 32px",
                        marginBottom: 20,
                        boxShadow: "0 2px 12px rgba(27,43,94,0.05)",
                    }}
                >
                    <h2
                        style={{
                            color: NAVY,
                            fontSize: 16,
                            fontWeight: 700,
                            marginTop: 0,
                            marginBottom: 20,
                            paddingBottom: 12,
                            borderBottom: `1px solid ${BORDER}`,
                        }}
                    >
                        صورة الملف الشخصي
                    </h2>

                    <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
                        {/* Avatar Preview */}
                        <div
                            style={{
                                width: 96,
                                height: 96,
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: `3px solid ${NAVY}`,
                                background: "#E8ECF5",
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    alt="avatar"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="18" r="10" fill={NAVY} opacity="0.3" />
                                    <ellipse cx="24" cy="38" rx="16" ry="8" fill={NAVY} opacity="0.2" />
                                </svg>
                            )}
                        </div>

                        {/* Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current.click()}
                            style={{
                                flex: 1,
                                minWidth: 200,
                                border: `2px dashed ${dragging ? GOLD : BORDER}`,
                                borderRadius: 12,
                                padding: "20px 24px",
                                textAlign: "center",
                                cursor: "pointer",
                                background: dragging ? "#FFFBF0" : "#FAFBFD",
                                transition: "all 0.2s",
                            }}
                        >
                            <div style={{ fontSize: 24, marginBottom: 6 }}>📷</div>
                            <p style={{ color: NAVY, fontWeight: 600, margin: "0 0 4px", fontSize: 14 }}>
                                اسحب صورتك هنا أو اضغط للاختيار
                            </p>
                            <p style={{ color: TEXT_MUTED, margin: 0, fontSize: 12 }}>
                                PNG, JPG, GIF — حد أقصى 5MB
                            </p>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageChange(e.target.files[0])}
                            />
                        </div>

                        {avatarPreview && (
                            <button
                                onClick={() => { setAvatar(null); setAvatarPreview(null); }}
                                style={{
                                    background: "transparent",
                                    border: `1px solid #E0303040`,
                                    color: "#C0392B",
                                    borderRadius: 8,
                                    padding: "8px 16px",
                                    fontSize: 13,
                                    cursor: "pointer",
                                    fontWeight: 600,
                                }}
                            >
                                حذف الصورة
                            </button>
                        )}
                    </div>
                </div>

                {/* Personal Info */}
                <div
                    style={{
                        background: CARD_BG,
                        borderRadius: 16,
                        border: `1px solid ${BORDER}`,
                        padding: "28px 32px",
                        marginBottom: 20,
                        boxShadow: "0 2px 12px rgba(27,43,94,0.05)",
                    }}
                >
                    <h2
                        style={{
                            color: NAVY,
                            fontSize: 16,
                            fontWeight: 700,
                            marginTop: 0,
                            marginBottom: 20,
                            paddingBottom: 12,
                            borderBottom: `1px solid ${BORDER}`,
                        }}
                    >
                        المعلومات الشخصية
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "18px 24px",
                        }}
                    >
                        <Field label="الاسم الكامل" value={name} onChange={setName} placeholder="أدخل اسمك" />
                        <Field label="اسم المستخدم" value={username} onChange={setUsername} placeholder="@username" dir="ltr" />
                        <Field label="رقم الهاتف" value={phone} onChange={setPhone} placeholder="+970 5X XXX XXXX" dir="ltr" />
                        <Field label="المدينة" value={city} onChange={setCity} placeholder="مثال: رام الله" />
                    </div>

                    <div style={{ marginTop: 18 }}>
                        <label
                            style={{
                                display: "block",
                                color: NAVY,
                                fontWeight: 600,
                                fontSize: 14,
                                marginBottom: 7,
                            }}
                        >
                            نبذة عنك
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            placeholder="اكتب نبذة قصيرة عن نفسك..."
                            style={{
                                width: "100%",
                                padding: "10px 14px",
                                borderRadius: 10,
                                border: `1.5px solid ${BORDER}`,
                                fontSize: 14,
                                color: TEXT_MAIN,
                                fontFamily: "inherit",
                                resize: "vertical",
                                outline: "none",
                                background: LIGHT_BG,
                                boxSizing: "border-box",
                                direction: "rtl",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = NAVY)}
                            onBlur={(e) => (e.target.style.borderColor = BORDER)}
                        />
                        <p style={{ color: TEXT_MUTED, fontSize: 12, margin: "4px 0 0", textAlign: "left" }}>
                            {bio.length} / 200
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-start" }}>
                    <button
                        onClick={handleSave}
                        style={{
                            background: NAVY,
                            color: "#fff",
                            border: "none",
                            borderRadius: 10,
                            padding: "12px 32px",
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: "pointer",
                            transition: "background 0.2s, transform 0.1s",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#152352")}
                        onMouseOut={(e) => (e.currentTarget.style.background = NAVY)}
                    >
                        {saved ? "✅ تم الحفظ!" : "💾 حفظ التغييرات"}
                    </button>
                    <button
                        onClick={() => {
                            setName("أحمد حسن");
                            setPhone("+970 59 123 4567");
                            setCity("رام الله");
                            setBio("بائع موثوق في منصة ReUseHub. أبيع إلكترونيات ومفروشات بحالة ممتازة.");
                        }}
                        style={{
                            background: "transparent",
                            color: TEXT_MUTED,
                            border: `1.5px solid ${BORDER}`,
                            borderRadius: 10,
                            padding: "12px 24px",
                            fontWeight: 600,
                            fontSize: 15,
                            cursor: "pointer",
                        }}
                    >
                        إلغاء
                    </button>
                </div>

                {/* Success Toast */}
                {saved && (
                    <div
                        style={{
                            position: "fixed",
                            bottom: 30,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: NAVY,
                            color: "#fff",
                            padding: "14px 28px",
                            borderRadius: 12,
                            fontWeight: 600,
                            fontSize: 15,
                            boxShadow: "0 6px 24px rgba(27,43,94,0.25)",
                            zIndex: 999,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        ✅ تم حفظ التغييرات بنجاح!
                    </div>
                )}
            </div>
        </div>
    );
}

function Field({ label, value, onChange, placeholder, dir }) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label
                style={{
                    display: "block",
                    color: "#1B2B5E",
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 7,
                }}
            >
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                dir={dir || "rtl"}
                style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: `1.5px solid ${focused ? "#1B2B5E" : "#E0E4EF"}`,
                    fontSize: 14,
                    color: "#1B2B5E",
                    fontFamily: "inherit",
                    outline: "none",
                    background: "#F5F6FA",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
}
