import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(400)
        .json({ type: "email", message: "User doesnt exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ type: "password", message: "Invalid credentials" });
    }

    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ users });
};

export const updateUser = async (req, res) => {
  const { id, pushToken } = req.body;
  await User.findByIdAndUpdate(id, { pushToken: pushToken });
};
