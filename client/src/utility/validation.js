export function validateProfileImage(profileImage) {
    if (!profileImage) {
        return 'Profile image is required';
    }
    return '';
}

export function validateName(name) {
    if (!name) {
        return 'Name is required';
    }
    const regex = /^[A-Za-z\s]{1,30}$/;
    if (!regex.test(name)) {
        return 'Name should only contain alphabets and not exceed 30 characters.';
    }
    return '';
}

export function validateEmail(email) {
    if (!email) {
        return 'Email is required';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return 'Invalid email format.';
    }
    return '';
}

export function validatePassword(password) {
    if (!password) {
        return 'Password is required';
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(password)) {
        return 'Password must be at least 8 characters long and contain at least one letter and one number.';
    }
    return '';
}

export function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
        return 'Confirm Password is required';
    }
    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }
    return '';
}

export function validateCompanyName(companyName) {
    if (!companyName) {
        return 'Company Name is required';
    }
    const regex = /^[A-Za-z\s]{1,50}$/;
    if (!regex.test(companyName)) {
        return 'Company Name should only contain alphabets and not exceed 50 characters.';
    }
    return '';
}

export function validateDateOfBirth(dateOfBirth) {
    if (!dateOfBirth) {
        return 'Date of Birth is required';
    }

    const today = new Date();
    const dob = new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18) {
        return 'You must be at least 18 years old.';
    }

    return '';
}