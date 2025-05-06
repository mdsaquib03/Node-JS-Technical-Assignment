import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        profileImage: null,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        dateOfBirth: "",
        age: "",
    });
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profileImage: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add backend submission logic here
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                <label>Profile Image<sup className="required">*</sup></label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && <img src={preview} alt="Preview" className="preview" />}

                <label>Name<sup className="required">*</sup></label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Email<sup className="required">*</sup></label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password<sup className="required">*</sup></label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Confirm Password<sup className="required">*</sup></label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <label>Company Name<sup className="required">*</sup></label>
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />

                <label>Date of Birth<sup className="required">*</sup></label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />

                <label>Age<sup className="required">*</sup></label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;