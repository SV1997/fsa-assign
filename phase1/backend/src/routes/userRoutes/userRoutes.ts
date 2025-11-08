import { Router } from "express";
import { getAllUsersController,updateUserDataController,deleteUserController,updateUserRoleController } from "../../controller/user-master/user-master";
import { verifyJWT, autheticateRole } from "../../middleware/verifyJWT";
import { Role } from '@prisma/client';

const router = Router();

router.get("/getallusers", verifyJWT, autheticateRole([Role.ADMIN]), getAllUsersController);
router.put("/updateuser", verifyJWT, autheticateRole([Role.ADMIN]), updateUserDataController);
router.delete("/delete-user", verifyJWT, autheticateRole([Role.ADMIN]), deleteUserController);
router.put("/updaterole/:id", verifyJWT, autheticateRole([Role.ADMIN]), updateUserRoleController);

export const userRouter = router;
