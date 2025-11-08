"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const router = require('express').Router();
const { loginController, signupController } = require('../../controller/authController/login');
// Define your routes here
router.get('/', (req, res) => {
    res.send('Auth Routes Working');
});
router.post('/signup', signupController);
router.post('/login', loginController);
exports.authRoutes = router;
