import { Router } from "express";
import { getAllUsersController,updateUserDataController,deleteUserController,updateUserRoleController } from "../../controller/user-master/user-master";
import { verifyJWT, authorizeRole } from "../../middleware/verifyJWT";
import { Role } from '@prisma/client';

const router = Router();

router.get("/getallusers", verifyJWT, authorizeRole([Role.ADMIN]), getAllUsersController);
router.put("/updateuser", verifyJWT, authorizeRole([Role.ADMIN]), updateUserDataController);
router.delete("/delete-user", verifyJWT, authorizeRole([Role.ADMIN]), deleteUserController);
router.put("/updaterole/:id", verifyJWT, authorizeRole([Role.ADMIN]), updateUserRoleController);

export const userRouter = router;
