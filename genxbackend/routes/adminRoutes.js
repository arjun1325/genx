import express from "express";
import { AdminLogin, AdminSignup } from "../controllers/adminController.js";
const router = express.Router();

//sign up
router.post("/sign-up",AdminSignup)
//login
router.post("/login",AdminLogin);

//get profile

router.get("/profile");
//update admin
router.put("/update");
//deactivate

router.put("/deactivate")

//delete user

router.delete("/deleteadmin");

//logout
router.put("/logout")

export {router as adminRouter}