import type{ Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const  createLoanController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newLoan = await prisma.loan.create({
            data:{
                equipmentId: data.equipmentId,
                requestId:data.requestId,
                borrowerId: data.borrowerId,
                from: data.from,
                to: data.to,
            }        })
        const deleteRequest= await prisma.request.delete({
            where:{id:data.requestId}
        })
        const equipmentUpdate= await prisma.equipment.update({
            where:{id:data.equipmentId},
            data:{
                available:{decrement:1}
            }
        })

        res.status(201).json({message:"Loan created successfully", loan: newLoan})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"internal server error"})
    }
}

export const getAllLoansController = async (req: Request, res: Response) => {
    try {
        const loans= await prisma.loan.findMany(            {include:{request:true, equipment:true, borrower:true}});
        res.status(200).json({loans});
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

export const updateLoanController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const updatedLoan = await prisma.loan.update({
            where: { id: data.id },
            data:{
                equipmentId: data.equipmentId,
                requestId:data.requestId,
                borrowerId: data.userId,
                from: data.fromDate,
                to: data.toDate,
                returnedAt: Date.now().toLocaleString()||""
            }
        })
        res.status(200).json({message:"Loan updated successfully", loan: updatedLoan})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

export const returnLoanController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const updatedLoan = await prisma.loan.update({
            where: { id: data.id },
            data:{
                returnedAt: new Date().toISOString(),
            }
        })
        res.status(200).json({message:"Loan updated successfully", loan: updatedLoan})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}
export const deleteLoanController = async (req: Request, res: Response) => {
    try {
        const loanData = req.body;
        const deletLoan= await prisma.loan.delete({
            where:{id:loanData.id}
        })
        res.status(200).json({message:"Loan deleted successfully"})
        } catch (error) {
        res.status(500).json({message:"internal server error"})
        }
    }

    export const getAllPenndingLoansController = async (req: Request, res: Response): Promise<void> => {
        try {
        const loans: number = await prisma.loan.findMany({where:{returnedAt:null}}).then((loans: any[]) => loans.length);
        res.status(200).json({loans});
        } catch (error) {
        res.status(500).json({message:"internal server error"})
        }
    }