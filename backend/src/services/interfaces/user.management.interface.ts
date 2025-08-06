import { IResProfile, ResGetUser } from "../../dtos/userLogin.dto";
import { GetUsersDTO } from "../../dtos/userLogin.dto";


export interface IUserManagementService {
    blockAndUnBlock(id: string, field:string): Promise<void>
    getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }>
    getUserProfile(id: string): Promise<IResProfile>
    sellerreject(id: string, reason: string): Promise<void>
    sellerReapply(id: string): Promise<void>
}