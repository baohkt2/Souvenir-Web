// admin.js
const asyncHandler = require('express-async-handler');

const checkRole = (roles) => asyncHandler(async (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
        next();
    } else {
        res.status(401).json({ message: `Not authorized as ${roles.join(' or ')}` });
    }
});

const adminRole = checkRole(['admin']);

module.exports = { adminRole };
