const Router=require('express').Router;
import { verifyJWT, authorizeRole } from '../../middleware/verifyJWT';
import type { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { getAllEquipmentController,getEquipmentByIdController ,addequipmentController, getEquipmentNumber,updateequipmentController, deleteequipmentController } from '../../controller/equipmentContoller/equipmentContoller';
const router = Router();


// import { Role } from '@prisma/client';
router.get('/getequipmentbyid/:id', verifyJWT, authorizeRole([Role.ADMIN, Role.STUDENT]), getEquipmentByIdController)
router.get('/getallequipment', verifyJWT, authorizeRole([Role.ADMIN, Role.STUDENT]), getAllEquipmentController)
router.post('/addequipment', verifyJWT, authorizeRole([Role.ADMIN]), addequipmentController)
router.put('/updateequipment', verifyJWT, authorizeRole([Role.ADMIN]), updateequipmentController)
router.delete('/deleteequipment', verifyJWT, authorizeRole([Role.ADMIN]), deleteequipmentController)
router.get('/available-count', verifyJWT, getEquipmentNumber)

export const equipmentRoutes = router;