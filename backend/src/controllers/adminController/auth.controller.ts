import { Request, Response } from "express";
import { IAdminAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError } from "../../utils/customError";



export class AdminAuthController implements IAdminAuthController {

    constructor(private readonly authService: IAuthService) { }
    async login(req: Request, res: Response): Promise<void> {
        try {

            const { email, password } = req.body

            const user = await this.authService.userLogin({ email, password, role: 'admin' })
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: user,
            });

        } catch (err: any) {
            console.log("error in  login admin controller ",err)
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
}