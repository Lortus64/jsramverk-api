const jwt = require("jsonwebtoken");


function checkToken(req, res, next) {

    const secret = process.env.JWT_SECRET;

    jwt.verify(req.body.token, secret, function(err, decoded) {
        if(err) {
            console.log(req.body.token + " is not a valid token");
            return res.sendStatus(401);
        }
        res.locals.token = decoded;
        next();
    });
}

module.exports = {checkToken};









