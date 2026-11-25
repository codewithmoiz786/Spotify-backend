const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const { username, email, password, role = "user" } = req.body;

    let UserAlreadyExist = await userModel.findOne({ $or: [{ username }, { email }] })
    if (UserAlreadyExist) {
        return res.status(401).json({
            message: "User Already Exist"
        })
    }
    let hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })
    let token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY)
    res.cookie("token", token)

    return res.status(200).json({
        message: "Account created successfully",
        user
    })

}

async function login(req, res) {
    const { email, username, password } = req.body;
    let LoggedInUser = await userModel.findOne({ $or: [{ email }, { username }] })

    if (!LoggedInUser) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    let checkPassword = await bcrypt.compare(password, LoggedInUser.password);
    if (!checkPassword) {
        return res.status(401).json({
            message: "Password or email is incorrect"
        })
    }
    let token = jwt.sign({ _id: LoggedInUser._id, role: LoggedInUser.role }, process.env.JWT_SECRET_KEY)
    res.cookie("token", token)
    
    res.status(200).json({
        message: "User LoggedIn successfully",
        LoggedInUser,
    })
}

module.exports = { register, login }