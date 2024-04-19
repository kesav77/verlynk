const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader+"rrrrrrrrrrrrrr")    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No or Invalid Authorization Header");
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1].trim();
    console.log("Token:", token);
    
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'verlynk', (err, user) => {
        if (err) {
            return res.sendStatus(404).send("userNotFound");
        }
        req.user = user
        next();
    });
}

module.exports = authenticateToken;
