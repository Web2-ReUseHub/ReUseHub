require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
console.log("THIS IS THE REAL BACKEND FILE");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const categoryRoutes = require("./routes/CategoryRoutes");
const proImgRoutes = require("./routes/ProimgRoutes");
const userRoutes = require("./routes/UserRoutes");

const requestRoutes = require("./routes/ReqsRoutes");
const favoriteRoutes = require("./routes/FavRoutes");
const usedItemRoutes = require("./routes/UseditemRoutes");
const aiRoutes = require("./routes/AIRoutes");


app.use("/Category", categoryRoutes);
app.use("/pro-imgs", proImgRoutes);
app.use("/user", userRoutes);
app.use("/requests", requestRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/used-items", usedItemRoutes);
app.use("/api/ai", aiRoutes);

app.listen(5004, () => {
  console.log("Server is running on port 5004");
});
