import express from "express";
import { AdminLogin, adminLogout, AdminProfile, AdminSignup, AdminUpdate } from "../controllers/adminController.js";
import { authAdmin } from "../middleware/authAdmin.js";
const router = express.Router();

//sign up
router.post("/sign-up",AdminSignup)
//login
router.post("/login",AdminLogin);

//get profile

router.get("/profile",authAdmin, AdminProfile );
//update admin
router.put("/update",authAdmin,AdminUpdate);
//deactivate

router.put("/deactivate")

//delete user

router.delete("/deleteadmin");

//logout
router.get("/logout",adminLogout)

export {router as adminRouter}