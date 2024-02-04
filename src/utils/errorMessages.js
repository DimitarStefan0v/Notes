exports.ERROR_MESSAGES = {
    REQUIRED: (property) => `${property} is required`,
    MIN_LENGTH: (property, length) => `${property} must be at least ${length} characters long`,
    MAX_LENGTH: (property, length) => `${property} can't be more than ${length} characters long`,
    USERNAME_REGEX: 'Only English letters and digits are allowed for username',
    EMAIL_REGEX: 'Invalid email address',
    USERNAME_TAKEN: 'The username already exists',
    EMAIL_TAKEN: 'This email is already registered for different user',
    REPEAT_PASSWORD: 'Password and repeat password don\'t match',
};