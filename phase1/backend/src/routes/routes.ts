const router= require('express').Router();
import { authRoutes } from './authRoutes/authRoutes';
import { requestsRouter } from './RequestsRouter/RequestRouter';
import { loanRoutes } from './loanRoutes/loanRoutes';
import { equipmentRoutes } from './equipmentRoutes/equipmetRoutes';
import { userRouter } from './userRoutes/userRoutes';
// Define your routes here

router.use('/auth', authRoutes);
router.use('/requests', requestsRouter);
router.use('/loans', loanRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/users', userRouter);
export const routes = router;