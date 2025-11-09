"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
exports.autheticateRole = autheticateRole;
const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
    var _a;
    console.log("verify");
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { userId: payload.userId, role: payload.role };
    next();
};
exports.verifyJWT = verifyJWT;
function autheticateRole(role) {
    console.log("role check");
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!userRole) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (role && !role.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
