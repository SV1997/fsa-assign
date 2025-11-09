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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.ensurePrismaConnected = ensurePrismaConnected;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./swagger");
// import bodyParser from 'body-parser'; // not needed with express.json()
const routes_1 = require("./routes/routes");
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3000;
// 1) CORS first
const client_1 = require("@prisma/client");
const globalForPrisma = global;
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    log: ['warn', 'error'],
});
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
function ensurePrismaConnected() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.prisma.$connect();
    });
}
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ensurePrismaConnected();
        console.log('Prisma connected ✅');
    }
    catch (e) {
        console.error('Prisma failed to connect ❌', e);
        process.exit(1);
    }
}))();
app.options(/.*/, (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, _res, next) => {
    console.log('Received request from origin:', req.headers.origin, 'to', req.method, req.url);
    next();
});
app.use('/api', routes_1.routes);
(0, swagger_1.setupSwagger)(app);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
