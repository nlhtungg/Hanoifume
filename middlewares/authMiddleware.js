const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    const token = req.cookies?.token; // Prevents crash if cookies are undefined

    if (!token) {
        req.user = null; // No user logged in
        return next(); // Continue to the next middleware/route
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user data in request
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        req.user = null;
        next(); // Continue to the next middleware/route
    }
};
