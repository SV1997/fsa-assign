const router= require('express').Router();
const { loginController, signupController } = require('../../controller/authController/login');
// Define your routes here
router.get('/', (req:any, res:any) => {
    res.send('Auth Routes Working');
});
router.post('/signup', signupController)
router.post('/login', loginController)

export const authRoutes = router;