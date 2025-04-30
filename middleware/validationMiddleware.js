import { body, validationResult } from 'express-validator';
import User from '../models/UserModel.js';

const validationErrors = (validateValues) => {
    return [
        validateValues,
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                return res.status(400).json({ success: false, errors: errorMessages });
            }
            next();
        },
    ];
};

export const validateRegister = validationErrors([
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 1 }).withMessage('Name must be at least 1 character long'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('companyName')
        .notEmpty().withMessage('Company name is required'),

    body('age')
        .notEmpty().withMessage('Age is required')
        .isInt({ min: 0 }).withMessage('Age must be a positive number'),

    body('dateOfBirth')
        .notEmpty().withMessage('Date of birth is required'),

    body('profileImage')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Profile image is required');
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (req.file.size > maxSize) {
                throw new Error('Profile image size must be under 2MB');
            }
            return true;
        }),
]);

export const validateVerifyOtp = validationErrors([
    body('userId')
        .notEmpty().withMessage('userId is required')
        .custom(async (userId) => {
            const existingUser = await User.findOne({ _id: userId });
            if (!existingUser) {
                throw new Error('User does not exist, please register first');
            }
        }),

    body('otp')
        .notEmpty().withMessage('OTP is required')
]);

export const validateLogIn = validationErrors([
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                throw new Error('User does not exist, please register first');
            }
        }),

    body('password')
        .notEmpty().withMessage('Password is required'),
]);

export const validateDeleteAccount = validationErrors([
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                throw new Error('User does not exist, please register first');
            }
        }),

    body('password')
        .notEmpty().withMessage('Password is required'),
]); 