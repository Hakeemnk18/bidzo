import { IUserRepository } from "../repositories/user.repo.interface";
import { IAuthService } from "./interfaces/auth.interfaces";
import { GoogleLoginDTO, UserLoginDTO, UserSignUpDTO } from "../dtos/userLogin.dto";
import { IJWTService } from "./interfaces/jwt.interface";
import { UserLoginResponseDTO } from "../dtos/userLogin.dto";
import { generateOTP } from "../utils/otpGenerator";
import { IOTPRepository } from "../repositories/otp.repo.interface";
import { IOTPService } from "./interfaces/otp.interface";
import { transporter } from "../config/mailer";
import { VerifyReqOTP } from "../dtos/OTP.dto";
import { CustomError } from "../utils/customError";
import { comparePassword, hashPassword } from "../utils/hash";
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
  const user = await repo.findByEmailAndRole(email, role);
  if (!user) throw new Error("Invalid credentials");
};


export class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly jwtService: IJWTService,
    private readonly otpService: IOTPService
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

  async userLogin(userData: UserLoginDTO): Promise<UserLoginResponseDTO> {
    console.log("inside user login service")
    const { email, role, password} = userData
    const user = await this.userRepo.findByEmailAndRole(email,role)
    if(!user){
      throw new CustomError("user not found ",404)
    }
    const passwordMatch = await comparePassword(password,user.password!)

    if(!passwordMatch){

      throw new CustomError("user not found ",404)
    }

    const jwtToken = await this.jwtService.sign({ id: user.id})

    const responseUser:UserLoginResponseDTO = {
      name: user.name,
      role: user.role,
      token: jwtToken
    }
    return responseUser

  }
  

  async googleLogin({ token }: GoogleLoginDTO): Promise<UserLoginResponseDTO> {

    try {
      console.log("inside service google login")

      const { email, name, sub } = await this.fetchGoogleProfile(token);

      let user = await this.userRepo.findByEmailAndRole(email, "user");
      if (!user) {
        console.log("inside if no user found")
        user = await this.userRepo.createGoogleUser({
          email,
          name,
          googleId: sub,
          role: "user",
        });
      }

      const jwtToken = await this.jwtService.sign({ id: user.id })


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

  async signUp(data: UserSignUpDTO): Promise<UserLoginResponseDTO> {
    try {
      
      const hashPsd = await hashPassword(data.password)
      const user = await this.userRepo.create({...data,role:'user', password:hashPsd})
      const jwtToken = await this.jwtService.sign({id: user.id})
      const responseUser: UserLoginResponseDTO = {
        name: user.name,
        role: user.role,
        token: jwtToken
      }
      return responseUser
    } catch (error) {
      console.log("error in signup service ", error)
      throw error;
    }
  }

  async sendOTPtoEmail(email: string): Promise<void> {

    console.log("iniside otp auth service ")
    const user = await this.userRepo.findByEmail(email)
    if(user){
      throw new CustomError("email already exist ",409)
    }
    const otp = generateOTP()
    const expiry = new Date(Date.now() + 1 * 60 * 1000);
    await this.otpService.saveAndUpdate({ email, otp, expiry })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 1 minute.</p>`,
    });

  }

  async verifyOtp(otpData: VerifyReqOTP): Promise<void> {
    
    const otp = await this.otpService.verifyOtp(otpData)
    
    if (!otp) {
      throw new Error("Invalid OTP");
    }

    
    if (otp && otp.expiry < new Date()) {
      throw new Error("OTP has expired");
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
