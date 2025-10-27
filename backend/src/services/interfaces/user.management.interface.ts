import { IResProfile, ResGetUser } from "../../dtos/userLogin.dto";
import { GetUsersDTO } from "../../dtos/userLogin.dto";
import { UpdateUserDTO } from "../../utils/validations/userValidation";



export interface IUserManagementService {
    blockAndUnBlock(id: string, field:string): Promise<void>
    getSeller(getUser: GetUsersDTO): Promise<{ resData: ResGetUser[]; total: number }>
    getUserProfile(id: string): Promise<IResProfile>
    sellerreject(id: string, reason: string): Promise<void>
    sellerReapply(id: string, documentUrl: string): Promise<void>
    userUpdate(userData: UpdateUserDTO): Promise<void>
    passwordMatch(password: string, id: string): Promise<boolean>
    changePassword(id: string, password: string, oldPassword: string): Promise<void>
}