require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

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

app.use("/Category", categoryRoutes);
app.use("/pro-imgs", proImgRoutes);
app.use("/user", userRoutes);
app.use("/requests", requestRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/used-items", usedItemRoutes);
app.use("/ai", aiRoutes);

app.listen(5004, () => console.log("Server is running on port 5004"));