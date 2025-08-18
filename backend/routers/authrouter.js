const router = require('express').Router();
const { signupvalidation, loginvalidation } = require('../middelware/authvalidation');
const { signup,login } = require('../controllers/authcontroller');
const { googlelogin } = require('../controllers/googleauth');
const { googleauth } = require('../middelware/authvalidation');
// Define routes for authentication
router.post('/login', loginvalidation , login);
router.post('/signup',signupvalidation, signup);
router.get('/google',googleauth, googlelogin ); 
module.exports = router