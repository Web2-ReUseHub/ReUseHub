import { useRef, useState } from "react";

function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("لابتوب");
  const [selectedCondition, setSelectedCondition] = useState("جديد");

  const [priceNegotiable, setPriceNegotiable] = useState(true);
  const [shippingAvailable, setShippingAvailable] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const categories = ["لابتوب", "سماعات", "ساعة ذكية", "ملابس", "أحذية", "حقائب", "أخرى"];
  const conditions = ["جديد", "مستعمل - ممتاز", "مستعمل - جيد"];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ direction: "rtl", background: "#f3f4f8", minHeight: "100vh", padding: "30px" }}>
      <div style={card}>

        <h2 style={titleStyle}>إنشاء منشور جديد</h2>

        {/* title */}
        <input
          placeholder="عنوان المنتج"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        {/* description */}
        <textarea
          placeholder="وصف المنتج"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textarea}
        />

        {/* images */}
        <div style={{ marginTop: "20px" }}>
          <div onClick={openFilePicker} style={uploadBox}>
            اضغطي لاختيار الصور
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={img.preview} style={previewImg} />
                <button onClick={() => removeImage(i)} style={removeBtn}>×</button>
              </div>
            ))}
          </div>
        </div>

        {/* price + quantity */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input value={price} onChange={(e) => setPrice(e.target.value)} style={input} />
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} style={input} />
        </div>

        {/* category */}
        <div style={section}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={selectedCategory === cat ? activeBtn : btn}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* condition */}
        <div style={section}>
          {conditions.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCondition(c)}
              style={selectedCondition === c ? activeBtn : btn}
            >
              {c}
            </button>
          ))}
        </div>

        {/* toggles */}
        <Toggle text="التفاوض" value={priceNegotiable} setValue={setPriceNegotiable} />
        <Toggle text="الشحن" value={shippingAvailable} setValue={setShippingAvailable} />
        <Toggle text="عرض الرقم" value={showPhone} setValue={setShowPhone} />

        {/* submit */}
        <button style={submitBtn}>
          نشر المنتج
        </button>

      </div>
    </div>
  );
}

function Toggle({ text, value, setValue }) {
  return (
    <div style={toggleRow}>
      <span>{text}</span>
      <div onClick={() => setValue(!value)} style={value ? toggleOn : toggleOff}>
        <div style={{ ...circle, right: value ? "25px" : "3px" }} />
      </div>
    </div>
  );
}

/* styles */

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  maxWidth: "600px",
  margin: "auto"
};

const titleStyle = { color: "#132a5a" };

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "white",
  color: "#132a5a",
  border: "2px solid #132a5a",
  borderRadius: "10px"
};

const textarea = { ...input, height: "100px" };

const uploadBox = {
  border: "2px dashed #132a5a",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  color: "#132a5a"
};

const previewImg = {
  width: "70px",
  height: "70px",
  borderRadius: "10px",
  border: "2px solid #132a5a"
};

const removeBtn = {
  position: "absolute",
  top: "-5px",
  right: "-5px",
  background: "#132a5a",
  color: "white",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer"
};

const section = {
  marginTop: "20px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const btn = {
  padding: "10px",
  borderRadius: "20px",
  border: "2px solid #132a5a",
  background: "white",
  color: "#132a5a"
};

const activeBtn = {
  ...btn,
  background: "#132a5a",
  color: "white"
};

const toggleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "15px"
};

const toggleOn = {
  width: "50px",
  height: "25px",
  background: "#132a5a",
  borderRadius: "20px",
  position: "relative",
  cursor: "pointer"
};

const toggleOff = {
  ...toggleOn,
  background: "#ccc"
};

const circle = {
  width: "20px",
  height: "20px",
  background: "white",
  borderRadius: "50%",
  position: "absolute",
  top: "2px"
};

const submitBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "14px",
  background: "#132a5a",   
  color: "white",          
  border: "none",
  borderRadius: "12px",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default CreateListing;