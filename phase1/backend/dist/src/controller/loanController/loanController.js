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
exports.deleteLoanController = exports.returnLoanController = exports.updateLoanController = exports.getAllPenndingLoansController = exports.getAllLoansController = exports.createLoanController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLoanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newLoan = yield prisma.loan.create({
            data: {
                equipmentId: data.equipmentId,
                requestId: data.requestId,
                borrowerId: data.borrowerId,
                from: data.from,
                to: data.to,
            }
        });
        const deleteRequest = yield prisma.request.delete({
            where: { id: data.requestId }
        });
        const equipmentUpdate = yield prisma.equipment.update({
            where: { id: data.equipmentId },
            data: {
                available: { decrement: 1 }
            }
        });
        res.status(201).json({ message: "Loan created successfully", loan: newLoan });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.createLoanController = createLoanController;
const getAllLoansController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield prisma.loan.findMany({ include: { request: true, equipment: true, borrower: true } });
        res.status(200).json({ loans });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllLoansController = getAllLoansController;
const getAllPenndingLoansController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield prisma.loan.findMany({ where: { returnedAt: null } }).then(loans => loans.length);
        res.status(200).json({ loans });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllPenndingLoansController = getAllPenndingLoansController;
const updateLoanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const updatedLoan = yield prisma.loan.update({
            where: { id: data.id },
            data: {
                equipmentId: data.equipmentId,
                requestId: data.requestId,
                borrowerId: data.userId,
                from: data.fromDate,
                to: data.toDate,
                returnedAt: Date.now().toLocaleString() || ""
            }
        });
        res.status(200).json({ message: "Loan updated successfully", loan: updatedLoan });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.updateLoanController = updateLoanController;
const returnLoanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const updatedLoan = yield prisma.loan.update({
            where: { id: data.id },
            data: {
                returnedAt: new Date().toISOString(),
            }
        });
        res.status(200).json({ message: "Loan updated successfully", loan: updatedLoan });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.returnLoanController = returnLoanController;
const deleteLoanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loanData = req.body;
        const deletLoan = yield prisma.loan.delete({
            where: { id: loanData.id }
        });
        res.status(200).json({ message: "Loan deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.deleteLoanController = deleteLoanController;
