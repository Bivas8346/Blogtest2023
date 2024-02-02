const jwt = require('jsonwebtoken')
exports.jwtAdminAuth = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, "BIVAS5555", (err, data) => {
            req.admin = data
            next()
        })
    } else {
        next()
    }
}