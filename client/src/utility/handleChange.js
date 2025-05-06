import {
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCompanyName,
    validateDateOfBirth,
    validateProfileImage
} from './validation';

export const handleImageChange = (event, setProfileImage) => {
    const file = event.target.files[0];
    setProfileImage(file);
}

export const handleChange = (event, errors, setErrors) => {
    const { name, value } = event.target;
    let errorMessage = '';

    switch (name) {
        case 'name':
            errorMessage = validateName(value);
            break;
        case 'email':
            errorMessage = validateEmail(value);
            break;
        case 'password':
            errorMessage = validatePassword(value);
            break;
        case 'confirmPassword':
            errorMessage = validateConfirmPassword(value, password);
            break;
        case 'companyName':
            errorMessage = validateCompanyName(value);
            break;
        case 'profileImage':
            errorMessage = validateProfileImage(value);
            break;
        default:
            break;
    }

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage
    }));
};
