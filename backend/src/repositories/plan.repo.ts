import { ICreatePlanDto } from "../dtos/plan.dto";
import PlanModel from "../models/plan.model";
import { IPlanRepo } from "./interfaces/plan.repo.interface";
import { injectable } from "tsyringe";


@injectable()
export class PlanRepository implements IPlanRepo {
    async createPlan(data: ICreatePlanDto): Promise<void> {
        await PlanModel.create(data)
    }
}