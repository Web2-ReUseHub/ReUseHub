const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "***REMOVED***";


exports.profile = async (req, res) => {
  try {
    res.json({
      message: "Welcome to protected profile",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    console.error("REAL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("REAL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.register = async (req, res) => {
  try {
    console.log('REGISTER body:', req.body);
    console.log('REGISTER content-type:', req.headers['content-type']);

    const {
      f_name,
      l_name,
      email,
      password,
      phone,
      address,
    } = req.body || {};

    const firstNameValue = f_name ;
    const lastNameValue = l_name || "";

    if (!firstNameValue || !email || !password) {
      return res.status(400).json({
        message: "First name, email and password are required",
        receivedBody: req.body,
        bodyType: typeof req.body,
      });
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      f_name: firstNameValue,
      l_name: lastNameValue,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        user_id: newUser.user_id,
        f_name: newUser.f_name,
        l_name: newUser.l_name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
      },
    });
  } catch (error) {
    console.error("REAL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        f_name: user.f_name,
        l_name: user.l_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("REAL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
