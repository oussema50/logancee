const { check} = require('express-validator');
const { validationResult } = require('express-validator');
exports.signupValidator = [//this for validation the data that come from the client
    check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
    check('email').normalizeEmail().isEmail().withMessage('Not an email')
];
exports.signinValidator = [//this for validation the data that come from the client
    check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
    check('email').normalizeEmail().isEmail().withMessage('Not an email')
];
exports.resultValidation = (req,res,next)=>{ //this middleware to sent the error message in json format to the client 
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if(hasErrors){
        const errorMsg = result.array()[0].msg;
        res.status(400).json({
            errorMessage:errorMsg,
        })
    }
    next();
}