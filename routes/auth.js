const express = require('express');
const { signupController,signinController } = require('../controller/auth');
const router = express.Router();
const {signupValidator,signinValidator,resultValidation} = require('../middleware/validator');
router.post('/signup',signupValidator,resultValidation,signupController);
router.post('/signin',signinValidator,resultValidation,signinController);
module.exports = router