import type{ Request, Response } from 'express';
import {PrismaClient} from "@prisma/client";
import { da } from 'zod/v4/locales';
import { success } from 'zod';
const prisma = new PrismaClient();
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.findMany();
        console.log(data);
        
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUserDataController = async (req: Request, res: Response) => {
    try {

        const data = await prisma.user.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role
            }
        });
        return res.status(200).json({ data, success:true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.delete({
            where: {
                id: req.query.id as string
            }
        });
        return res.status(200).json({ data, success:true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUserRoleController = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.update({
            where:{
                id: req.params.id
            },
            data:{
                role: req.body.role
            }
        });
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}