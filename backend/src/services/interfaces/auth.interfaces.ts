import { GoogleLoginDTO } from "../../dtos/userLogin.dto"
import { UserLoginResponseDTO } from "../../dtos/userLogin.dto";

export interface IAuthService {
  googleLogin(data: GoogleLoginDTO): Promise<UserLoginResponseDTO>;
}

