import type { Request, Response } from "express";
export declare const createRequestController: (req: Request, res: Response) => Promise<void>;
export declare const getAllRequestsController: (req: Request, res: Response) => Promise<void>;
export declare const getRequestController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const approveRequestController: (req: Request, res: Response) => Promise<void>;
export declare const rejectRequestController: (req: Request, res: Response) => Promise<void>;
export declare const deleteRequestController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=RequestController.d.ts.map