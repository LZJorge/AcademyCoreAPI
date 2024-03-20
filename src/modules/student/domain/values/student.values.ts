export const studentValues = {
    password: {
        length: {
            min: 8,
            max: 64,
        },
        regex: {
            pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,64}$/),
        }
    }
};