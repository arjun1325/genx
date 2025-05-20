import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const UserSignup = async (req, res, next) => {

    try {
        //get data
        const { name, email, password, confirmpassword, mobile } = req.body;
        console.log(req.body);

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

export const UserLogin = async (req, res, next) => {
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
            return res.status(400).json({ message: "User not found" });
        }
        if (!userExist.isActive) {
            return res.status(400).json({ message: "User account is not active" });
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
export const UserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId);
        res.json({ data: userData, message: "Profile send to client side" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });
    }
};
export const UserUpdate = async (req, res, next) => {
    try {
        const { name, email, password, mobile } = req.body;
        const userId = req.user.id;
       
        const userData = await User.findByIdAndUpdate(userId,{ name, email, password, mobile },{ new: true });
        if(!userData){
            res.status(404).json({message:"userData not found"})
        }
        console.log(userData);
        
        res.json({ data: userData, message: "data updated" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });
    }
};
export const userLogout = async(req,res,next)=>{
    try {
        res.clearCookie("token")
res.json({meassage : "user logout successfull"})
    } catch (error) {
        res.status(401).json({message:"something went wrong"})
        
    }
}

