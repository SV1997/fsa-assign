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
exports.deleteRequestController = exports.rejectRequestController = exports.approveRequestController = exports.getRequestController = exports.getAllRequestsController = exports.createRequestController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newRequest = yield prisma.request.create({
            data: {
                equipmentId: data.equipmentId,
                requesterId: data.requestId,
                from: data.fromDate,
                to: data.toDate,
            }
        });
        res.status(201).json({ message: "Request created successfully", request: newRequest });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.createRequestController = createRequestController;
const getAllRequestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield prisma.request.findMany();
        res.status(200).json({ message: "Requests fetched successfully", requests });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllRequestsController = getAllRequestsController;
const getRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        if (!requestId) {
            return res.status(400).json({ message: 'Request id is required' });
        }
        const request = yield prisma.request.findUnique({
            where: { id: requestId }
        });
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request fetched successfully', request });
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.getRequestController = getRequestController;
const approveRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.body.id;
        const updateRequest = yield prisma.request.update({
            where: { id: requestId },
            data: {
                status: 'APPROVED'
            }
        });
        res.status(200).json({ message: "Request approved successfully", request: updateRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.approveRequestController = approveRequestController;
const rejectRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.body.id;
        const updateRequest = yield prisma.request.update({
            where: { id: requestId },
            data: {
                status: 'REJECTED'
            }
        });
        res.status(200).json({ message: "Request rejected successfully", request: updateRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.rejectRequestController = rejectRequestController;
const deleteRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = req.body;
        const deleteRequest = yield prisma.request.delete({
            where: { id: requestData.id }
        });
        res.status(200).json({ message: "Request deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.deleteRequestController = deleteRequestController;
