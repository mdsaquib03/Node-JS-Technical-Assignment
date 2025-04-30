import { Router } from "express";
import {
    register,
    logIn,
    logOut,
    verifyOtpAndLogin
} from "../../../conrtollers/authController.js";
import {
    validateRegister,
    validateLogIn,
    validateVerifyOtp
} from "../../../middleware/validationMiddleware.js";
import upload from "../../../middleware/multerMiddleware.js";

const router = Router();

router.post("/register",
    upload.single("file"),
    (req, res, next) => {
        if (req.file) {
            req.body.profileImage = req.file.path;
            req.body.fileSize = req.file.size;
        }
        next();
    },
    validateRegister,
    register
);
router.post("/login", validateLogIn, logIn);
router.post("/verify-otp", validateVerifyOtp, verifyOtpAndLogin);
router.post("/logout", logOut);

export default router;