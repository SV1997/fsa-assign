"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const authRoutes_1 = require("./authRoutes/authRoutes");
const RequestRouter_1 = require("./RequestsRouter/RequestRouter");
const loanRoutes_1 = require("./loanRoutes/loanRoutes");
const equipmetRoutes_1 = require("./equipmentRoutes/equipmetRoutes");
// Define your routes here
router.use('/auth', authRoutes_1.authRoutes);
router.use('/requests', RequestRouter_1.requestsRouter);
router.use('/loans', loanRoutes_1.loanRoutes);
router.use('/equipment', equipmetRoutes_1.equipmentRoutes);
module.exports = router;
