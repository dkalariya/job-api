const User = require("../model/User")
const { StatusCodes } = require('http-status-codes')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')



// function verifytoken(req,res,next){
//     const token=req.header("AUthorization");
//     if (!token) {
//         return res.status(401).send({ message: "Unauthorized: No token provided" });

//     }

//     jwt.verify(token,'jwtSecret',(err)=>{
//         if(err){
//             return res.status(StatusCodes).json({message:"Unauthorized: Invalid token" })
//         }
//         next();
//     })
// } 
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please provide name, email, and password.");
    }

    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return register.send('Please provide email and password')
    }
   
        const user = await User.findOne({ email });

        if (!user) {
            return register.send('Invalid Credentials')
        }
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return register.send('Invalid Credentials')
        }
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({ name: user.name, token });

}

module.exports = {
    register,
    login,

}