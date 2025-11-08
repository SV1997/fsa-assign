import { Router } from 'express';
import { authRoutes } from './authRoutes/authRoutes';
import { requestsRouter } from './RequestsRouter/RequestRouter';
import { loanRoutes } from './loanRoutes/loanRoutes';
import { equipmentRoutes } from './equipmentRoutes/equipmetRoutes';
import { userRouter } from './userRoutes/userRoutes';

// Compose the API router by mounting feature-specific sub-routers.  Using
// ES module syntax throughout ensures consistent module loading.  The
// order of these `use` calls matters for middleware precedence.
const router = Router();

router.use('/auth', authRoutes);
router.use('/requests', requestsRouter);
router.use('/loans', loanRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/users', userRouter);

export const routes = router;