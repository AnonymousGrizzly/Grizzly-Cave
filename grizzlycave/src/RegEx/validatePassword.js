export function validatePassword(signup_password) {
    //  Must contain 8 characters, 1 number, 1 letter and 1 unique character (!#$%/?-.;,:)
    const re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    return re.test(signup_password);
}