import "dotenv/config";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    await userModel.create({
      email,
      password: bcript.hashSync(password, 10),
      rol,
      lenguage
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOneEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcript.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // creación del payload
    const payload = {
      email,
      user_id: user.user_id,
      rol: user.rol,
      lenguage: user.lenguage
    };

    // creación del token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successfully",
      token,
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const usuarios = async (req, res) => {
  try {
    const users = await userModel.findOneEmail(req.user.email);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userController = {
  login,
  register,
  usuarios
};
