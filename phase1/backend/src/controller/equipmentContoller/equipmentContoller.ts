import type{ Request, Response } from 'express';
import {PrismaClient} from "../../generated/prisma/client";
const prisma = new PrismaClient();
export const getEquipmentByIdController = async (req: Request, res: Response) => {
    const equipmentId = req.params.id;
    if (!equipmentId) {
        return res.status(400).json({ message: 'Equipment id is required' });
    }
    try {
        const equipment = await prisma.equipment.findUnique({
            where: { id: equipmentId }
        });
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        return res.status(200).json({ equipment });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// export const addCategoryController = async (req: Request, res: Response) => {
//     try{
//         const { name } = req.body;
//         const newCategory = await prisma.category.create({
//             data: {
//                 name
//             }
//         });
//         return res.status(200).json({ category: newCategory });
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

// export const getAllCategoriesController = async (req: Request, res: Response) => {
// try {
//         const categories = await prisma.category.findMany();
//         return res.status(200).json({ categories });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

export const getAllEquipmentController = async (req: Request, res: Response) => {
    console.log("All equipments");
    
    try {
        const equipment = await prisma.equipment.findMany();
        return res.status(200).json({ equipment });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    }


export const addequipmentController = async (req: Request, res: Response) => {
    try {
        const { name, category, condition, quantity, available,id } = req.body;
        const newEquipment = await prisma.equipment.create({
            data: {
                name,
                category: category,
                condition,
                quantity,
                available
            }
        });
        console.log(newEquipment);
        
        return res.status(200).json({ equipment: newEquipment });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getEquipmentNumber=async(req:Request,res:Response)=>{
    try {
        const equipmentCount = await prisma.equipment.findMany({
            where: { available: { gt: 0 } }
        }).then((equipments:any) => equipments.length);
        return res.status(200).json({ count: equipmentCount });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteequipmentController = async (req: Request, res: Response) => {
    try{
        const data = req.query;
        const deleteLoans = await prisma.loan.deleteMany({
            where:{equipmentId:data.id as string}
        })
        const deletedRequests = await prisma.request.deleteMany({
            where:{equipmentId:data.id as string}
        })
        
        const deleteEquipment = await prisma.equipment.delete({
            where: { id: data.id as string }
        });
        return res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateequipmentController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const updatedEquipment = await prisma.equipment.update({
            where: { id: data.id },
            data:{
                name: data.name,
                category: data.category,
                condition: data.condition,
                quantity: data.quantity,
                available: data.available
            }
        })
        console.log(updatedEquipment);
        
        res.status(200).json({ equipment: updatedEquipment });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Internal server error' });
    }
}