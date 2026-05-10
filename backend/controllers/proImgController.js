const db = require("../models");

exports.getAllProImgs = async (req, res) => {
  try {
    const proImgs = await db.Proimg.findAll();
    res.json(proImgs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product images");
  }
};

exports.getProImgById = async (req, res) => {
  try {
    const id = req.params.id;
    const proImg = await db.Proimg.findByPk(id);

    if (!proImg) {
      return res.status(404).send("Product image not found");
    }

    res.json(proImg);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product image");
  }
};

exports.createProImg = async (req, res) => {
  try {
    const newProImg = await db.Proimg.create(req.body);
    res.status(201).json(newProImg);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating product image");
  }
};
