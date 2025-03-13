import express from "express";
const router = express.Router();

//sign up
router.post("/sign-up");
//login
router.post("/login");

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
