import type { Request, Response, NextFunction } from 'express';
import type { Role } from '@prisma/client';
export declare const verifyJWT: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare function autheticateRole(role?: Role[]): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=verifyJWT.d.ts.map