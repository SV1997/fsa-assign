import type { Request, Response } from 'express';
const {PrismaClient} = require("@prisma/client");
const { access } = require('fs');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
   
const loginController = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })
        
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
                console.log(isValidPassword);

        if(!isValidPassword){
            return res.status(401).json({message: 'Invalid credentials'});
        }
    const accessToken = signAccessToken(user.id, user.role);
    
    return res.status(200).json({message: 'Login successful', user, role: user.role, accessToken: accessToken});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: error});
    }
}

const signAccessToken =(userId:string, role: string) =>{
const accessToken=jwt.sign({userId,role},process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1h'});
return accessToken;
}

const signupController = async (req: Request, res: Response) => {
    const {name,email, password} = req.body;
    console.log("signup");
    
    try {
        const existingUser = await prisma.user.findUnique({
            where:{email}
        })
        if(existingUser){
            return res.status(409).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role: 'STUDENT'
            }
        })
            const accessToken = signAccessToken(newUser.id, newUser.role);
    return res.status(200).json({message: 'signup successful', user: newUser, role: newUser.role, accessToken: accessToken});
        // return res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    loginController,
    signupController
}