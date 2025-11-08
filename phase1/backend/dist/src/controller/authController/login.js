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
const { PrismaClient } = require("@prisma/client");
const { access } = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isValidPassword = yield bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const accessToken = signAccessToken(user.id, user.role);
        return res.status(200).json({ message: 'Login successful', user, role: user.role, accessToken: accessToken });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
const signAccessToken = (userId, role) => {
    const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return accessToken;
};
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'STUDENT'
            }
        });
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = {
    loginController,
    signupController
};
