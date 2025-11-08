"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('BOOT: server.ts loaded'); // very first line
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import bodyParser from 'body-parser'; // not needed with express.json()
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
const port = 3000;
// 1) CORS first
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // <-- no trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// If you want to be explicit about preflight handling:
app.options('*', (0, cors_1.default)()); // handle all OPTIONS preflights
// 2) Parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // redundant, remove
// 3) Simple logger
app.use((req, _res, next) => {
    console.log('Received request from origin:', req.headers.origin, 'to', req.method, req.url);
    next();
});
// 4) Health route
app.get('/', (_req, res) => {
    console.log('Health check route accessed');
    res.send('Server is running');
});
// 5) API routes
app.use('/api', routes_1.routes);
// 6) Start
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
