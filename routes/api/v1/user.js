import { Router } from "express";
import {
    deleteAccount
} from "../../../conrtollers/userController.js";

const router = Router();

router.delete("/delete-account", deleteAccount);

export default router;