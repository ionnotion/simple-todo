import {Request,Response,NextFunction} from "express"

export function authorization(req:Request,res:Response,next:NextFunction) {
	try {
        
        next()
	} catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error!"})
    }
}
