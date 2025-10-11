import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";

export interface IProductController {
    getAllProducts(req: AuthenticatedRequest, res: Response): Promise<void>;
    createProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
    getCategoriesName(req: Request, res: Response): Promise<void>
    blockAndUnblock(req: AuthenticatedRequest, res: Response): Promise<void>
    updatePorduct(req: AuthenticatedRequest, res: Response): Promise<void>
    getProduct(req: AuthenticatedRequest, res: Response): Promise<void>
}   