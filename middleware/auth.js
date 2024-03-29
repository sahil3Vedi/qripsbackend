const jwt = require('jsonwebtoken')

function auth(req,res,next) {
    const token = req.header('x-auth-token')

    // Check for token
    if(!token) res.status(401).json({message:'No Token, Authorization Denied'})

    try{
        //Verify token
        const decoded = jwt.verify(token, process.env.jwtSecret)
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({message:'Token is not valid'})
    }
}

module.exports = auth
