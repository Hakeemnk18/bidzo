import { IUserRepository } from "../repositories/user.repo.interface";
import { IAuthService } from "./interfaces/auth.interfaces";
import { GoogleLoginDTO } from "../dtos/userLogin.dto";
import { IJWTService } from "./interfaces/jwt.interface";
import { UserLoginResponseDTO } from "../dtos/userLogin.dto";
//import { GoogleUserDTO } from "../dtos/userLogin.dto";


interface GoogleProfile {
  sub: string;
  email: string;
  name: string;
}



export const loginUser = async (
  email: string,
  password: string,
  role: string,
  repo: IUserRepository
) => {
  const user = await repo.findByEmail(email, role);
  if (!user) throw new Error("Invalid credentials");
};


export class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly jwtService: IJWTService
  ) { }



  private async fetchGoogleProfile(token: string): Promise<GoogleProfile> {

    try {
      console.log("inside fech google")
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Invalid Google token");

      return await res.json();

    } catch (error) {
      console.log("error inside fetch google profile ", error)
      throw error
    }

  }

  async googleLogin({ token }: GoogleLoginDTO): Promise<UserLoginResponseDTO> {

    try {
      console.log("inside service google login")

      const { email, name, sub } = await this.fetchGoogleProfile(token);

      let user = await this.userRepo.findByEmail(email, "user");
      if (!user) {
        console.log("inside if no user found")
        user = await this.userRepo.createGoogleUser({
          email,
          name,
          googleId: sub,
          role: "user",
        });
      }
      console.log("after user fetch")
      const jwtToken = await this.jwtService.sign({ _id: user.id })
      console.log(jwtToken)

      const responseUser: UserLoginResponseDTO = {
        name: user.name,
        role: user.role,
        token: jwtToken,
      };

      return responseUser;

    } catch (error) {
      console.log("error in google login service ", error)
      throw error;
    }


  }

}

// export const findOrCreateByGoogle = async ({
//   email,
//   name,
//   googleId,
//   role,
//   repo,
// }: GoogleUserDTO) => {

//   const user = await repo.findByEmail(email, role);
//   if (!user) {
//     return await repo.createGoogleUser({ email, name, googleId, role });
//   }
// };
