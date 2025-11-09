
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger';
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
    log: ['warn', 'error'], 
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function ensurePrismaConnected() {
  await prisma.$connect();

}


app.use(cors({
  origin: 'http://localhost:5173',
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

app.options(/.*/, cors());        

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log('Received request from origin:', req.headers.origin, 'to', req.method, req.url);
  next();
});


app.use('/api', routes);
setupSwagger(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
