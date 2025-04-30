import { Router } from "express";
import {
    deleteAccount
} from "../../../conrtollers/userController.js";
import {
    validateDeleteAccount
} from "../../../middleware/validationMiddleware.js";

const router = Router();

router.delete("/delete-account", validateDeleteAccount, deleteAccount);

export default router;