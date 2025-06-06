import Admin from "../model/adminmodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const AdminSignup = async (req, res, next) => {
    try {
        console.log("sign up hitted");
        //get data
        const { name, email, password, confirmpassword, mobile } = req.body;

        //validation

        if (!name || !email || !password || !confirmpassword || !mobile) {
            return res.status(400).json({ message: "all fields required" });
        }

        //existing  admin check

        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            return res.status(400).json({ message: "admin already exists" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password Didn't match " });
        }

        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword, mobile });
        await newAdmin.save();

        // Generate token
        const token = generateToken(newAdmin._id, "admin");
        res.cookie("token", token);

        res.json({ data: newAdmin, message: "Signup successfull" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};

export const AdminLogin = async (req, res, next) => {
    try {
        //gain data
        const { email, password, confirmpassword } = req.body;

        //validation

        if (!email || !password || !confirmpassword) {
            return res.status(400).json({ message: "all fields required" });
        }
        //admin Exist
        const adminExist = await Admin.findOne({ email });
        if (!adminExist) {
            return res.status(400).json({ message: "Admin Not Found" });
        }
        // match password with db
        const comparePassword = bcrypt.compareSync(password, adminExist.password);
        if (!comparePassword) {
            return res.status(401).json({ message: "invalid credentials" });
        }

        //generate token
        const token = generateToken(adminExist._id, "admin");
        res.cookie("token", token);

        if (!adminExist.isActive) {
            res.json({ data: adminExist, message: "not an active admin" });
        }

        delete adminExist._doc.password;
        res.json({ data: adminExist, message: "login successfull" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};

export const AdminProfile = async (req, res, next) => {
    try {
        const adminId = req.admin.id;
        const adminData = await Admin.findById(adminId);
        res.json({ data: adminData, message: "admin data fetched" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};
export const AdminUpdate = async (req, res, next) => {
    try {
        const { name, email, password, mobile } = req.body;
        const adminId = req.admin.id;
        const adminData = await Admin.findByIdAndDelete(adminId, { name, email, password, mobile }, { new: true });
        if (!adminData) {
            res.status(400).json({ message: "Admin data not found" });
        }
        res.json({ data: adminData, message: "data updated" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "internal error" });
    }
};
export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookies("token");
        res.json({ message: "Admin logged out successfull" });
    } catch (error) {
        res.status(401).json({ message: "something went wrong" });
    }
};
