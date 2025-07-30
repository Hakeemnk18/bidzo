import { ResGetUser } from "../../dtos/userLogin.dto";
import { GetUsersDTO } from "../../dtos/userLogin.dto";


export interface IUserManagementService {
   // getUser(req: Request, res: Response): Promise<{ data: User[]; total: number }>
    getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }>
}