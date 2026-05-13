require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

// استيراد sequelize من مجلد models
// ملاحظة: إذا ملفاتك داخل مجلد models، هاد السطر هو الصح:
const { sequelize } = require("./models");

console.log("THIS IS THE REAL BACKEND FILE");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  if (typeof req.url === 'string') {
    const normalizedUrl = req.url.replace(/(%0A|%0D|\r|\n)+$/g, '');
    if (normalizedUrl !== req.url) {
      req.url = normalizedUrl;
    }
  }
  next();
});

app.use(cors());

// استدعاء الـ Routes
const categoryRoutes = require("./routes/CategoryRoutes");
const proImgRoutes = require("./routes/ProimgRoutes");
const userRoutes = require("./routes/UserRoutes");
const requestRoutes = require("./routes/ReqsRoutes");
const favoriteRoutes = require("./routes/FavRoutes");
const usedItemRoutes = require("./routes/UseditemRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/Category", categoryRoutes);
app.use("/pro-imgs", proImgRoutes);
app.use("/user", userRoutes);
app.use("/requests", requestRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/used-items", usedItemRoutes);
app.use("/ai", aiRoutes);

// عمل مزامنة مع قاعدة البيانات (بناء الجداول)
// استخدمنا force: true لمرة واحدة فقط لتنظيف الجداول المعلقة
sequelize.sync()
    .then(() => {
      console.log("✅ Tables recreated successfully on the new database!");

      // تشغيل السيرفر بعد التأكد من المزامنة
      app.listen(5004, () => {
        console.log("Server is running on port 5004");
      });
    })
    .catch(err => {
      console.error("❌ Database sync error:", err);
    });