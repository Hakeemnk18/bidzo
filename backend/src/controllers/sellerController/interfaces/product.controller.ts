import { Response } from "express";
import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";

export interface IProductController {
    getAllProducts(req: AuthenticatedRequest, res: Response): Promise<void>;
    createProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
}   