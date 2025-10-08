import { Request, Response } from "express";

export interface ICategoryController {
    getAllCategories(req: Request, res: Response): Promise<void>;
    createCategory(req: Request, res: Response): Promise<void>;
    blockAndUnblockCategory(req: Request, res: Response): Promise<void>;
    editCategory(req: Request, res: Response): Promise<void>;
}