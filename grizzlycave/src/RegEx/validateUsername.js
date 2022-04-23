export function validateUsername(username) {
    //Must be shorter than 20 characters, no spaces, no special characters
    const re = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/;
    return re.test(username);
}