import express from "express";
import { UserLogin, userLogout, UserProfile, UserSignup, UserUpdate } from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";
const router = express.Router();

//sign up

router.post("/sign-up", UserSignup);
//login

router.post("/login", UserLogin);

//get profile

router.get("/profile",authUser,UserProfile);
//update admin
router.put("/update",authUser,UserUpdate);
//deactivate

router.put("/deactivate");

//delete admin

router.delete("/deleteuser");

//logout
router.get("/logout",userLogout);

export { router as userRouter };
