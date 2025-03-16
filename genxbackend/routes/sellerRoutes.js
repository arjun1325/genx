import express from "express";
import { SellerLogin, SellerSignup } from "../controllers/sellerController.js";
const router = express.Router();

//sign up
router.post("/sign-up",SellerSignup);
//login
router.post("/login",SellerLogin);

//get profile

router.get("/profile");

//update admin

router.put("/update");

//deactivate

router.put("/deactivate");

//delete seller

router.delete("/deleteseller");

//logout
router.put("/logout");

export { router as sellerRouter };
