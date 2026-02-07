import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import JWT from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const RegisterUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ([email, name, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{ email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, user , "User registered Successfully"));
  } catch (error) {
    throw new ApiError(500, error, "failed to register new User");
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        
      throw new ApiError(401, "Invalid login credentials");
    }

    // Generate Token
    const token = JWT.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    // ✅ SUCCESS: Use return res.status().json()
    // Do NOT use 'throw' here.
    return res.status(200).json(
        new ApiResponse(200, {
            token,
            user: { id: user._id, name: user.name, email: user.email }
        }, "User logged In Successfully")
    );

  } catch (error) {
    // If it's already an ApiError, just re-throw it so the global handler catches it
    if (error instanceof ApiError) throw error;
    
    // Otherwise, wrap unknown errors
    throw new ApiError(500, error?.message || "Internal Server Error", error);
  }
});

export { RegisterUser, LoginUser };
