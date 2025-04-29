import User from '../models/UserModel.js';
import { comparePassword } from '../utils/passwordUtils.js';

export const deleteAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        await User.findByIdAndDelete(user._id);
        res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
};
