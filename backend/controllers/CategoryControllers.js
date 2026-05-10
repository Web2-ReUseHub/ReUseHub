const db = require("../models");


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await db.Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching categories");
    }
};


exports.getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await db.Category.findByPk(id);

        if (!category) {
            return res.status(404).send("Category not found");
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching category");
    }
};


exports.createCategory = async (req, res) => {
    try {
        const newCategory = await db.Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating category");
    }
};