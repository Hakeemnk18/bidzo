import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repo';
import { CustomError } from '../utils/customError';


export const isBlockedMiddleware = async (req: Request & { user?:any}, res:Response, next:NextFunction) => {

    try {

        console.log("inside is bloked")

        if( req.user && req.user.id){
            const userRepo = new UserRepository()
            const user = await userRepo.findById(req.user.id)
            console.log("user ",user)
            if(user?.isBlocked){
                console.log("access denied ")
                throw new CustomError("access denied", 403)
            }
        }

        next()
        

        
    } catch (error) {
        next(error);
    }
}