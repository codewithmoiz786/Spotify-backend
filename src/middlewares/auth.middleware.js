const jwt = require('jsonwebtoken')

async function artist(req, res, next) {
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decoded) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    if (decoded.role !== "artist") {
        return res.status(408).json({
            message: "You have don`t have an access"
        })
    }
    req.user = decoded
    next()

}

async function user(req, res, next) {
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decoded) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    if (decoded.role !== "user") {
        return res.status(408).json({
            message: "You don,t have an access"
        })
    }
    next()
}


module.exports = { artist, user }