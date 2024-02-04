exports.isRequired = (value) => {
    if (!value || value.length < 1 || /^[\s]+$/.test(value)) {
        return false;
    }

    return true;
};