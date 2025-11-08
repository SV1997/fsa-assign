"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
