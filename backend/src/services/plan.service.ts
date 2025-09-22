import { ICreatePlanDto } from "../dtos/plan.dto";
import { IPlanRepo } from "../repositories/interfaces/plan.repo.interface";
import { IPlanService } from "./interfaces/plan.interface";
import { injectable,inject } from "tsyringe";



@injectable()
export class PlanService implements IPlanService {

    constructor(
        @inject('IPlanRepo') private readonly planRepo: IPlanRepo
    ){}

    async creat(data: ICreatePlanDto): Promise<void> {
        await this.planRepo.createPlan(data)
    }
}