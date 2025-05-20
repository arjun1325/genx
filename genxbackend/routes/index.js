import express from "express";
import { userRouter } from './userRouter.js';
import { adminRouter } from "./adminRoutes.js";
import { sellerRouter } from "./sellerRoutes.js";


const router = express.Router();

router.use("/user",userRouter)
router.use("/admin",adminRouter)
router.use("/seller",sellerRouter)

export {router as apiRoutes}