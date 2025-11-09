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
exports.updateUserRoleController = exports.deleteUserController = exports.updateUserDataController = exports.getAllUsersController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.user.findMany();
        console.log(data);
        return res.status(200).json({ data });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllUsersController = getAllUsersController;
const updateUserDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.user.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role
            }
        });
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateUserDataController = updateUserDataController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.user.delete({
            where: {
                id: req.query.id
            }
        });
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteUserController = deleteUserController;
const updateUserRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                role: req.body.role
            }
        });
        return res.status(200).json({ data });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateUserRoleController = updateUserRoleController;
