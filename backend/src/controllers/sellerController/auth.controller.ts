import { Request, Response } from "express";
import { ISellerAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";
import { CustomError } from "../../utils/customError";


export class SellerAuthController implements ISellerAuthController {

    constructor(private readonly authService: IAuthService) { }
    async signup(req: Request, res: Response): Promise<void> {
        try {

            const { name, password, email, phone } = req.body

            const user = await this.authService.signUp({ name, email, password, phone, role: "seller", isVerified: "pending" })
            res.status(200).json({
                success: true,
                message: "Signup successful. Your account requires admin approval before you can access seller features.",
                data: user,
            });
        } catch (err) {
            console.error("Signup filed controller", err);
            res.status(500).json({
                success: false,
                message: "Google login failed",
                error: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {

            const { email, password } = req.body

            const user = await this.authService.userLogin({ email, password, role: 'seller' })
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: user,
            });

        } catch (err: any) {
            console.log("error in  login user controller ")
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
}