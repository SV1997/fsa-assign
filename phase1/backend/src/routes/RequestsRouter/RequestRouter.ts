import { Router } from "express";
import { verifyJWT,autheticateRole } from "../../middleware/verifyJWT";
import { createRequestController, getAllRequestsController, getAllPendingRequestsController, getRequestController,approveRequestController,rejectRequestController,deleteRequestController } from "../../controller/RequestContoller/RequestController";
import { Role } from '@prisma/client';
const router = Router();

router.get('/getRequests', verifyJWT,getAllRequestsController);
router.get('/getrequestbyid', verifyJWT, getRequestController);
router.post('/createrequest', verifyJWT, createRequestController);
router.put('/approverequest', verifyJWT,autheticateRole([Role.ADMIN]), approveRequestController);
router.put('/rejectrequest', verifyJWT,autheticateRole([Role.ADMIN]),rejectRequestController);
router.get('/number-of-pending-requests', verifyJWT, getAllPendingRequestsController);
router.delete('/delete-request', verifyJWT,autheticateRole([Role.ADMIN,Role.STUDENT]),deleteRequestController);

export const requestsRouter = router;