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
exports.deleteLoanController = exports.updateLoanController = exports.getAllLoansController = exports.createLoanController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLoanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newLoan = yield prisma.loan.create({
            data: {
                equipmentId: data.equipmentId,
                requestId: data.requestId,
                borrowerId: data.userId,
                from: data.fromDate,
                to: data.toDate,
            }
        });
        res.status(201).json({ message: "Loan created successfully", loan: newLoan });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.createLoanController = createLoanController;
const getAllLoansController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield prisma.loan.findMany();
        res.status(200).json({ loans });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllLoansController = getAllLoansController;
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
