import type {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const createRequestController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data);

        const newRequest = await prisma.request.create({
            data:{
                equipmentId: data.equipmentId,
                requesterId: data.requesterId,
                from: new Date(data.from),
                to: new Date(data.to),
            }
        },)
        
        res.status(201).json({message:"Request created successfully", request: newRequest})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"internal server error", error:error})
    }
}

export const getAllRequestsController = async (req: Request, res: Response) => {
    try {
        const requests = await prisma.request.findMany({include:{equipment:true, requester:true}});
        console.log(requests);
        
        res.status(200).json({message:"Requests fetched successfully", requests})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

export const getRequestController = async (req: Request, res: Response) => {
    try {
        const requesterId = req.query.id as string;
        console.log(requesterId);
        
        if (!requesterId) {
            return res.status(400).json({ message: 'Requester id is required' });
        }
        const request = await prisma.request.findMany({
            where: { requesterId: requesterId }
        });
        console.log(request);
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request fetched successfully', request });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'internal server error' });
    }
}

export const approveRequestController = async (req: Request, res: Response) => {
    try {
        const requestId=req.body.id;
        console.log(requestId);
        
        const updateRequest = await prisma.request.update({
            where: { id: requestId },
            data:{
                status: 'APPROVED'
            }
        })
        res.status(200).json({message:"Request approved successfully", request: updateRequest})
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export const rejectRequestController = async (req: Request, res: Response) => {
    try {
        const requestId=req.body.id;
        const updateRequest = await prisma.request.update({
            where:{id:requestId},
            data:{
                status:'REJECTED'
            }
        })
        res.status(200).json({message:"Request rejected successfully", request: updateRequest})
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export const deleteRequestController = async (req: Request, res: Response) => {
    const data = req.query.id;
    console.log(data);
    
    try {
        console.log("delete");
        
        const requestData=req.body;
        const deleteRequest = await prisma.request.delete({
            where:{id:(data as string)}
        })
        res.status(200).json({message:"Request deleted successfully"})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'internal server error' });
    }
}

export const getAllPendingRequestsController = async (req: Request, res: Response) => {
    try {
        const requests = await prisma.request.findMany({
            where: { status: 'PENDING' },
        }).then((requests:any) => requests.length);
        console.log(requests);
        
        res.status(200).json({message:"Requests fetched successfully", requests})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}