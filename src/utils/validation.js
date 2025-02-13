const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(email)) {
        throw new Error("email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("password is not valid!");
    }
};
 const validatePassword = (req)=> {
const { newPassword } = req.body;
if (!validator.isStrongPassword(newPassword)) {
    throw new Error("password is not valid!");
 }};

const validateProfileEditData = (req) => {
    const allowedEdits = ['firstName', 'lastName', 'email' , 'age', 'photoUrl'];
    const isAllowedEdits = Object.keys(req.body).every((field) => allowedEdits.includes(field));
    return isAllowedEdits;
};

module.exports = { validateSignUpData, validateProfileEditData ,validatePassword};