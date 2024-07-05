const { check, validationResult } = require('express-validator');

// Define the validation chain for emailid
const emailValidationChain = [
    check('emailid').isEmail().withMessage('Invalid email address')
];

// Function to run the validations
const runValidations = async (data) => {
    const validationPromises = data.map(async (item, index) => {
        const req = { body: item };
        await Promise.all(emailValidationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        return { index, errors: errors.array() };
    });

    return Promise.all(validationPromises);
};

// Validate the result array
const validateExcelData = (req, res, next) => {
    const excelData = req.excel_data;
    runValidations(excelData).then(validationResults => {
        const invalidResults = validationResults.filter(result => result.errors.length > 0);
        if (invalidResults.length > 0) {
            console.log('Validation errors:');
            invalidResults.forEach(({ index, errors }) => {
                console.log(`Item at index ${index}:`, errors);
            });
            return res.status(400).json({
                success: false,
                error: "Data in given excel is not fully valid.",
            });
        }
        next();
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: "Error running validation.",
        });
    });
}

module.exports = {
    validateExcelData
}