const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
router.use(express.json());
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const jwtSecret = "PriyaShreeRaiYouAreBeautifulSoul";

router.post("/loginuser", [body("password", "Password length must be greater than 8 character").isLength({min:8}),
body("email", "Invalid Email").isEmail()],async(req, res)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try{
        const {email, password} = req.body;

        const user  = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                message: "Invalid email"
            })

        }

        if(user.password!==password)
        {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }
        
        const data = {
            user : {
                id:user.id,
              
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        res.status(200).json({
            success : true,
            authToken : authToken,
            role: user.role
          
        })

    }catch(e){
        res.status(400).json({
            message: e.message

        })

    }

})
module.exports = router;