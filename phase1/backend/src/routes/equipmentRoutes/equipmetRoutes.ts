const Router=require('express').Router;
import {verifyJWT,autheticateRole} from '../../middleware/verifyJWT';
import type { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { getAllEquipmentController,getEquipmentByIdController,addequipmentController, getEquipmentNumber,updateequipmentController, deleteequipmentController } from '../../controller/equipmentContoller/equipmentContoller';
const router = Router();


// import { Role } from '@prisma/client';
router.get('/getequipmentbyid/:id', verifyJWT, autheticateRole([Role.ADMIN, Role.STUDENT]), getEquipmentByIdController)
router.get('/getallequipment', verifyJWT, autheticateRole([Role.ADMIN, Role.STUDENT]), getAllEquipmentController)
router.post('/addequipment', verifyJWT, autheticateRole([Role.ADMIN]), addequipmentController)
router.put('/updateequipment', verifyJWT, autheticateRole([Role.ADMIN]), updateequipmentController)
router.delete('/deleteequipment', verifyJWT, autheticateRole([Role.ADMIN]), deleteequipmentController)
// router.get("/getCategories", verifyJWT, getAllCategoriesController);
router.get('/available-count', verifyJWT, getEquipmentNumber)
export const equipmentRoutes = router;