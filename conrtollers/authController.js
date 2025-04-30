import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenutils.js';
import { sendOtpEmail } from '../services/emailService.js';
import { uploadFile } from '../services/s3Services.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, companyName, age, dateOfBirth } = req.body;
    const file = req.file;
    const hashedPassword = await hashPassword(password);

    let profileImageUrl = null;
    if (file) {
      profileImageUrl = await uploadFile(file, email);
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      companyName,
      age,
      dateOfBirth,
      profileImage: profileImageUrl,
    });

    res.status(201).json({ success: true, message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const emailResponse = await sendOtpEmail({ to: user.email, name: user.name, otp });
    if (!emailResponse.success) {
      return res.status(500).json({ success: false, message: `Failed to send OTP ${email}` });
    }

    res.status(200).json({ msg: 'OTP sent to your email' });
  } catch (error) {
    console.log('Error logging in user:', error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const verifyOtpAndLogin = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (user.otp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(401).json({ success: false, message: "OTP has expired" });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = createJWT({ userId: user._id });
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      msg: `Welcome ${user.name}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        companyName: user.companyName,
        age: user.age,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (error) {
    console.log('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: 'User logged out' });
  } catch (error) {
    console.log('Error logging out user:', error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};
