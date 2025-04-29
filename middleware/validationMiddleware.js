import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import mongoose from 'mongoose';

const validationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith('not authorized')) {
                    throw new UnauthorizedError(errorMessages);
                }
                throw new BadRequestError(errorMessages)
            }
            next();
        }
    ]
}

export const validateJobInput = validationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);

export const validateIdParam = validationErrors([
    param('id')
        .custom(async (value) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidId) throw new BadRequestError('invalid MongoDB id');
            const job = await Job.findById(value);
            if (!job) throw new NotFoundError(`no job with id ${value}`);
            const isAdmin = req.user.role === 'admin'
            const isOwner = req.user.userId === job.createdBy.toString()
            if (!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to access this route')
        }),
]);

export const validateRegister = validationErrors([
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('email').notEmpty().withMessage('email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) throw new BadRequestError('email already exists');
        }),
    body('password').notEmpty().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
]);

export const validateLogIn = validationErrors([
    body('email').notEmpty().withMessage('email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = validationErrors([
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('email').notEmpty().withMessage('email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) throw new BadRequestError('email already exists');
        }),
    body('location').notEmpty().withMessage('location is required'),
]);