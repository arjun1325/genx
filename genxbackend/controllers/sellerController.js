import Seller from "../model/sellermodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const SellerSignup = async (req, res, next) => {
    try {
        console.log("sign up hitted");
        //get data
        const { name, email, password, confirmpassword, mobile } = req.body;

        //validation

        if (!name || !email || !password || !confirmpassword || !mobile) {
            return res.status(400).json({ message: "all fields required" });
        }
        

        //existing  seller check

        const sellerExist = await Seller.findOne({ email });
        if (sellerExist) {
            return res.status(400).json({ message: "seller already exists" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password Didn't match " });
        }

        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newSeller = new Seller({ name, email, password: hashedPassword, mobile });
        await newSeller.save();


        // Generate token
        const token = generateToken(newSeller._id, "seller");
        res.cookie("token", token);

        res.json({ data: newSeller, message: "Signup successfull" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};

export const SellerLogin = async (req, res, next) => {
    try {
        //gain data
        const { email, password, confirmpassword } = req.body;
        
        //validation
        
        if (!email || !password || !confirmpassword) {
            return res.status(400).json({ message: "all fields required" });
        }
        //seller Exist
        const sellerExist = await Seller.findOne({ email });
        if (!sellerExist) {
            return res.status(400).json({ message: "all fields required" });
        }
        // match password with db
        const comparePassword = bcrypt.compareSync(password, sellerExist.password);
        if (!comparePassword){
            
            return res.status(401).json({ message: "invalid credentials" });
        }
        
        //generate token
        const token = generateToken(sellerExist._id, "seller");
        res.cookie("token", token);
        
        res.json({ data: sellerExist, message: "login successfull" });
        
        if(!sellerExist.isactive){
            
            res.json({ data: sellerExist, message: "not an active seller" });
        }

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};

