import { Request, Response } from "express";

export interface IBidCountController {
  getAllBidCounts(req: Request, res: Response): Promise<void>;
  getBidCountById(req: Request, res: Response): Promise<void>;
  createBidCount(req: Request, res: Response): Promise<void>;
  updateBidCount(req: Request, res: Response): Promise<void>;
  deleteBidCount(req: Request, res: Response): Promise<void>;
  getAllBidCountsByFilter(req: Request, res: Response): Promise<void>;
}