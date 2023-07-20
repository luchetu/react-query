export const validateItem = async (field) => {
    const rules = [
        { required: true, message: 'This field is required.' },
    ];

    if (field.name === 'email') {
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(field.value)) {
            return Promise.reject('Please enter a valid email address.');
        }
        return Promise.resolve();
    };

    return rules;
};