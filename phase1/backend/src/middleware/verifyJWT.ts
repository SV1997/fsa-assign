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

export function autheticateRole(role?: Role[]) {
            console.log("role check");

    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role;
        if(!userRole){
            return res.status(401).json({ message: 'Unauthorized' });
        }
    if (role && !role.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

}

