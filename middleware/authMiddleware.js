import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Users from '../models/usersModel.js';

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token, "authMiddleware");
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //req.user = await Users.findById(decoded.id).select('-password')
            req.user = await Users.getUserById(decoded.id);
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, no hay token')
    }
})

export default protect;