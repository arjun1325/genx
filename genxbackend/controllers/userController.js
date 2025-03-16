import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const userSignup = async (req, res, next) => {
    try {
        //get data
        const { name, email, password, confirmpassword, mobile } = req.body;

        //validation

        if (!name || !email || !password || !confirmpassword || !mobile) {
            return res.status(400).json({ message: "all fields required" });
        }

        //existing  user check

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "user already exists" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password Didn't match " });
        }

        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, mobile });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id, "user");
        res.cookie("token", token);

        res.json({ data: newUser, message: "Signup successfull" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};

export const userLogin = async (req, res, next) => {
    try {
        //gain data
        const { email, password, confirmpassword } = req.body;

        //validation

        if (!email || !password || !confirmpassword) {
            return res.status(400).json({ message: "all fields required" });
        }
        //user Exist
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "all fields required" });
        }
        // match password with db
        const comparePassword = bcrypt.compareSync(password, userExist.password);
        if (!comparePassword) {
            return res.status(401).json({ message: "invalid credentials" });
        }

        // //generate token
        const token = generateToken(userExist._id, "user");
        res.cookie("token", token);

        delete userExist._doc.password;
        res.json({ data: userExist, message: "login successfull" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });
    }
};
