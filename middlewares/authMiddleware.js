const JWT=require('jsonwebtoken');
const User=require('../models/User');

// Check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header..The split(' ')[1] extracts the actual token from the header.
        const token = req.header('Authorization')?.split(' ')[1];

        // If no token is provided, deny access
        if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

        // Verify the token using the secret key
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Find the user in the database using the ID from the decoded token
        req.user = await User.findById(decoded.id);

        // If the user is not found, the token is invalid
        if (!req.user) return res.status(401).json({ error: 'Invalid token.' });

        // User is authenticated; proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails or any error occurs, deny access
        res.status(401).json({ error: 'Unauthorized access.' });
    }
};
// Check if the user is an admin
const isAdmin = (req, res, next) => {
    // Check if the user's role is 'admin'
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    // User is an admin; proceed to the next middleware or route handler
    next();
};
module.exports = { isAuthenticated, isAdmin };