"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateequipmentController = exports.deleteequipmentController = exports.addequipmentController = exports.getAllEquipmentController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllEquipmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const equipmentId = req.params.id;
    if (!equipmentId) {
        return res.status(400).json({ message: 'Equipment id is required' });
    }
    try {
        const equipment = yield prisma.equipment.findUnique({
            where: { id: equipmentId }
        });
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        return res.status(200).json({ equipment });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllEquipmentController = getAllEquipmentController;
const addequipmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, condition, quantity, available } = req.body;
        const newEquipment = yield prisma.equipment.create({
            data: {
                name,
                category,
                condition,
                quantity,
                available
            }
        });
        return res.status(201).json({ equipment: newEquipment });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addequipmentController = addequipmentController;
const deleteequipmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const deleteEquipment = yield prisma.equipment.delete({
            where: { id: data.id }
        });
        return res.status(200).json({ message: 'Equipment deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteequipmentController = deleteequipmentController;
const updateequipmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const updatedEquipment = yield prisma.equipment.update({
            where: { id: data.id },
            data: {
                name: data.name,
                category: data.category,
                condition: data.condition,
                quantity: data.quantity,
                available: data.available
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateequipmentController = updateequipmentController;
