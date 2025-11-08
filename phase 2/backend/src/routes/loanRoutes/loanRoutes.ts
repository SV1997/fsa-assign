import { Router } from "express";
import { verifyJWT, authorizeRole } from "../../middleware/verifyJWT";
import { Role } from "@prisma/client";
import { getAllLoansController, createLoanController, updateLoanController,getAllPenndingLoansController, deleteLoanController, returnLoanController } from "../../controller/loanController/loanController";
const router = Router();

router.get('/getLoans', verifyJWT, authorizeRole([Role.ADMIN, Role.STUDENT]), getAllLoansController);
router.post('/createloan', verifyJWT, authorizeRole([Role.ADMIN]), createLoanController);
router.put('/updateLoan', verifyJWT, authorizeRole([Role.ADMIN]), updateLoanController);
router.put('/returnloan', verifyJWT, authorizeRole([Role.ADMIN]), returnLoanController);
router.delete('/deleteLoan', verifyJWT, authorizeRole([Role.ADMIN]), deleteLoanController);
router.get("/number-of-pending-loans", verifyJWT, getAllPenndingLoansController);

export const loanRoutes = router;
