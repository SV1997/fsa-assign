import type { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import type { JwtPayload } from 'jsonwebtoken';
import type { Role } from '@prisma/client';
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log("verify");
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const payload=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload & { userId?: string; role?: string };
    (req as any).user = { userId: payload.userId, role: payload.role };

    next();
}

export function authorizeRole(allowedRoles?: Role[]) {
  // Middleware factory that checks the logged‑in user's role against a list
  // of allowed roles.  If the user is not authenticated or their role
  // isn't in the allowed list, the request will be rejected.
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;
    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (allowedRoles && !allowedRoles.includes(userRole as Role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

