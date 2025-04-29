import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    otp: {
        type: String
    }, 
    otpExpiry: {
        type: String
    },
});

UserSchema.method.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('User', UserSchema);