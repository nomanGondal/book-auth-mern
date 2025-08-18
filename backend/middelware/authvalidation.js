  const joi = require('joi');

  const signupvalidation = (req , res,next) => {
    
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    console.log("Signup validation passed");
    next();
  }

  const loginvalidation = (req , res,next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      
        return res.status(400).json({ message: error.details[0].message });
    }
    console.log("Login validation passed");
    next();
  }

    const googleauth = (req, res, next) => {
    const schema = joi.object({
        code: joi.string().required()
    });
    const { error } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    console.log("Google auth validation passed");
    next();
  }

    module.exports = {
        signupvalidation,loginvalidation, googleauth
    };