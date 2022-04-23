export function validateFolderName(folderName) {
    //special chars not allowed, at least 3 chars, just numbers and letters
    const re = /^([a-zA-Z0-9][^*/><?|:]*)$/;
    return re.test(folderName);
}