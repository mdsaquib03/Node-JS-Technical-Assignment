import { Router } from "express";
import {
    register,
    logIn,
    logOut,
    verifyOtpAndLogin
} from "../../../conrtollers/authController.js";
import upload from "../../../middleware/multerMiddleware.js";

const router = Router();

router.post("/register",
    upload.single("file"),
    register);
router.post("/login", logIn);
router.post("/verify-otp", verifyOtpAndLogin);
router.post("/logout", logOut);

export default router;