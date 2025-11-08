import { Router } from "express";
import { verifyJWT, authorizeRole } from "../../middleware/verifyJWT";
import { createRequestController, getAllRequestsController, getRequestController,getAllPendingRequestsController, approveRequestController, rejectRequestController, deleteRequestController } from "../../controller/requestController/RequestController";
import { Role } from '@prisma/client';
const router = Router();

router.get('/getRequests', verifyJWT,getAllRequestsController);
router.get('/getrequestbyid', verifyJWT, getRequestController);
router.post('/createrequest', verifyJWT, createRequestController);
router.put('/approverequest', verifyJWT, authorizeRole([Role.ADMIN]), approveRequestController);
router.put('/rejectrequest', verifyJWT, authorizeRole([Role.ADMIN]), rejectRequestController);
router.delete('/delete-request', verifyJWT, authorizeRole([Role.ADMIN, Role.STUDENT]), deleteRequestController);
router.get('/number-of-pending-requests', verifyJWT, getAllPendingRequestsController);

export const requestsRouter = router;