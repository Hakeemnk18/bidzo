import { Request, Response } from "express";
import { ISellerAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../../services/interfaces/auth.interfaces";


export class SellerAuthController implements ISellerAuthController {

    constructor(private readonly authService: IAuthService) { }
    async signup(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside signup ", req.body)
            const { name, password, email, phoneNumber } = req.body
            const user = await this.authService.signUp({ name, email, password, phoneNumber, role: "seller" })
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
}