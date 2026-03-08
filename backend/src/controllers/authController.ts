import type { Request, Response } from "express";
import { User, type IUser } from "../models/user.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import Jwt from "jsonwebtoken";

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const { name, email, password } = await req.body;

    // Here you would typically save the user to the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = Jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function loginUserHandler(req: Request, res: Response) {
  try {
    const { email, password } = await req.body;

    // Find user by email
    const existingUser: IUser | null = await User.findOne({ email });
    if (!existingUser) {
      return res.status(409).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = comparePassword(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = Jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Respond with user data and token
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}
