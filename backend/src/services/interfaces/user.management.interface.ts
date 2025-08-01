import { ResGetUser } from "../../dtos/userLogin.dto";
import { GetUsersDTO } from "../../dtos/userLogin.dto";


export interface IUserManagementService {
    blockAndUnBlock(id: string): Promise<void>
    getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }>
}