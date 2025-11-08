"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipmentRoutes = void 0;
const Router = require('express').Router;
const verifyJWT_1 = require("../../middleware/verifyJWT");
const client_1 = require("@prisma/client");
const equipmentContoller_1 = require("../../controller/equipmentContoller/equipmentContoller");
const router = Router();
function autheticateRole(roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        next();
    };
}
// import { Role } from '@prisma/client';
router.get('/getequipment/:id', verifyJWT_1.verifyJWT, autheticateRole([client_1.Role.ADMIN, client_1.Role.STUDENT]), equipmentContoller_1.getAllEquipmentController);
router.post('/addequipment', verifyJWT_1.verifyJWT, autheticateRole([client_1.Role.ADMIN]), equipmentContoller_1.addequipmentController);
router.put('/updateequipment', verifyJWT_1.verifyJWT, autheticateRole([client_1.Role.ADMIN]), equipmentContoller_1.updateequipmentController);
router.delete('/deleteequipment', verifyJWT_1.verifyJWT, autheticateRole([client_1.Role.ADMIN]), equipmentContoller_1.deleteequipmentController);
exports.equipmentRoutes = router;
