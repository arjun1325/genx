import express from "express";
const router = express.Router();
import { userLogin, userSignup} from "../controllers/userController.js"

//sign up
router.post("/sign-up",userSignup);
//login
router.post("/login",userLogin);

//get profile

router.get("/profile");
//update admin
router.put("/update");
//deactivate

router.put("/deactivate")

//delete admin

router.delete("/deleteuser");

//logout
router.put("/logout")

export {router as userRouter}