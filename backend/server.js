require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const { sequelize } = require("./models");

console.log("THIS IS THE REAL BACKEND FILE");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  if (typeof req.url === 'string') {
    const normalizedUrl = req.url.replace(/(%0A|%0D|\r|\n)+$/g, '');
    if (normalizedUrl !== req.url) req.url = normalizedUrl;
  }
  next();
});

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const categoryRoutes = require("./routes/CategoryRoutes");
const proImgRoutes = require("./routes/ProimgRoutes");
const userRoutes = require("./routes/UserRoutes");
const requestRoutes = require("./routes/ReqsRoutes");
const favoriteRoutes = require("./routes/FavRoutes");
const usedItemRoutes = require("./routes/UseditemRoutes");
const aiRoutes = require("./routes/aiRoutes");
const smartSearchRoutes = require("./routes/smartSearchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");



app.use("/Category", categoryRoutes);
app.use("/pro-imgs", proImgRoutes);
app.use("/user", userRoutes);
app.use("/requests", requestRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/used-items", usedItemRoutes);
app.use("/ai", aiRoutes);
app.use("/api", smartSearchRoutes);
app.use("/admin/stats", dashboardRoutes);




sequelize.sync()
    .then(() => {
      console.log("✅ Tables recreated successfully on the new database!");

      app.listen(5004, () => {
        console.log("Server is running on port 5004");
      });
    })
    .catch(err => {
      console.error("❌ Database sync error:", err);
    });
