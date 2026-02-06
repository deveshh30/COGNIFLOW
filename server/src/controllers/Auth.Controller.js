import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcryptjs';
import User from '../models/User.js'


const RegisterUser = async( req , res ) => {
    try {
        const{ name, email, password} = req.body;

        if (!name || !email || !password) {
            throw new ApiResponse(404, "lol its wronng")
        }

        let user = await User.findOne({email});

        if(user) {
            return res.status(409).json(new ApiResponse(409, null, "user with this email already exists"));
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password : hashedPassword,
        });

        return res.status(201).json(new ApiResponse(201, { id: user._id, name: user.name, email: user.email }, "user registered"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "something went wrong"));
    }
}

export {
    RegisterUser,
}