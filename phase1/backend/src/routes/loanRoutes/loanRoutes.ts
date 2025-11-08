import { Router } from "express";
import { jwt } from "zod";
import { verifyJWT,autheticateRole } from "../../middleware/verifyJWT";
import { Role } from "@prisma/client";
import { getAllLoansController, createLoanController,getAllPenndingLoansController, updateLoanController, deleteLoanController, returnLoanController } from "../../controller/loanController/loanController";
const router = Router();

router.get('/getLoans',verifyJWT,autheticateRole([Role.ADMIN, Role.STUDENT]),getAllLoansController);
router.post('/createloan',verifyJWT,autheticateRole([Role.ADMIN]),createLoanController);
router.put('/updateLoan',verifyJWT,autheticateRole([Role.ADMIN]),updateLoanController);
router.put('/returnloan',verifyJWT,autheticateRole([Role.ADMIN]),returnLoanController);
router.delete('/deleteLoan',verifyJWT,autheticateRole([Role.ADMIN]),deleteLoanController);
router.get("/number-of-pending-loans", verifyJWT, getAllPenndingLoansController);
export const loanRoutes = router;
