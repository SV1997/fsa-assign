
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser'; // not needed with express.json()
import {routes} from './routes/routes';
import 'dotenv/config';

const app = express();
const port = 3000;

// 1) CORS first
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'], // add 'query' temporarily if you want
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Optional: connect early to fail fast with a clear error
export async function ensurePrismaConnected() {
  await prisma.$connect();
  // quick sanity probe:
  // await prisma.$queryRaw`SELECT 1`;
}


app.use(cors({
  origin: 'http://localhost:5173', // <-- no trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
(async () => {
  try {
    await ensurePrismaConnected();
    console.log('Prisma connected ✅');
  } catch (e) {
    console.error('Prisma failed to connect ❌', e);
    process.exit(1);
  }
})();

// If you want to be explicit about preflight handling:
app.options(/.*/, cors());        

// 2) Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // redundant, remove

// 3) Simple logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log('Received request from origin:', req.headers.origin, 'to', req.method, req.url);
  next();
});


// 5) API routes
app.use('/api', routes);

// 6) Start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
