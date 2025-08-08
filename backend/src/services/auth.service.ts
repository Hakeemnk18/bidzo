import { IUserRepository } from "../repositories/interfaces/user.repo.interface";
import { IAuthService } from "./interfaces/auth.interfaces";
import { GoogleLoginDTO, UserLoginDTO, UserSignUpDTO } from "../dtos/userLogin.dto";
import { IJWTService } from "./interfaces/jwt.interface";
import { UserLoginResponseDTO } from "../dtos/userLogin.dto";
import { generateOTP } from "../utils/otpGenerator";
import { User } from "../types/userType";
import { IOTPService } from "./interfaces/otp.interface";
import { transporter } from "../config/mailer";
import { VerifyReqOTP } from "../dtos/OTP.dto";
import { CustomError } from "../utils/customError";
import { comparePassword, hashPassword, hashResetToken } from "../utils/hash";
import { IResetPasswordRepo } from "../repositories/interfaces/reset.password.repo.interface";
import { ISendEMAIL, sendEmail } from "../utils/send.email";
import { GoogleProfile } from "../interfaces/AuthenticatedRequest";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { inject, injectable } from "tsyringe";




@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject('IUserRepository') private readonly userRepo: IUserRepository,

    @inject('IJWTService') private readonly jwtService: IJWTService,
    @inject('IOTPService') private readonly otpService: IOTPService,
    @inject('IResetPasswordRepo') private readonly resetRepo: IResetPasswordRepo
  ) { }



  private async fetchGoogleProfile(token: string): Promise<GoogleProfile> {

    try {
      console.log("inside fech google")
      const res = await fetch(process.env.GOOGLE_PROFILE_URL!, {
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
    const { email, role, password } = userData

    const user = await this.userRepo.findByEmailAndRole(email, role)

    if (!user) {
      throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    if (user.isBlocked) {
      throw new CustomError(ResponseMessages.ACCESS_DENIED, HttpStatusCode.FORBIDDEN)
    }
    const passwordMatch = await comparePassword(password, user.password!)

    if (!passwordMatch) {

      throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }

    if (role === "seller" && user.isVerified === "pending") {
      throw new CustomError(ResponseMessages.SELLER_SIGNUP_PENDING, HttpStatusCode.FORBIDDEN);
    }

    const jwtToken = await this.jwtService.sign({ id: user.id, role: user.role })

    const responseUser: UserLoginResponseDTO = {
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
      if (user && user.isBlocked) {
        throw new CustomError(ResponseMessages.ACCESS_DENIED, HttpStatusCode.FORBIDDEN)
      }
      if (!user) {

        user = await this.userRepo.createGoogleUser({
          email,
          name,
          googleId: sub,
          role: "user",
        });
      }

      const jwtToken = await this.jwtService.sign({ id: user.id, role: user.role })


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
      const user = await this.userRepo.create({ ...data, password: hashPsd })

      if (user.role === 'seller' && user.isVerified === "pending") {
        const responseUser: UserLoginResponseDTO = {
          name: "",
          role: "seller",
          token: ""
        }
        return responseUser
      }



      const jwtToken = await this.jwtService.sign({ id: user.id, role: user.role })
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
    if (user) {
      throw new CustomError(ResponseMessages.EMAIL_EXIST, HttpStatusCode.CONFLICT)
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
      throw new CustomError(ResponseMessages.INVALID_OTP,HttpStatusCode.NOT_FOUND);
    }


    if (otp && otp.expiry < new Date()) {
      throw new CustomError(ResponseMessages.OTP_EXPIRED,HttpStatusCode.GONE);
    }
  }

  async verifyEmail(email: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email)

    if (!user) {
      throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return user
  }

  async generateResetToken(email: string): Promise<void> {


    const user = await this.verifyEmail(email); 

    const token = hashResetToken()

    await this.resetRepo.create({
      userId: user.id!,
      token: token,
      expire: new Date(Date.now() + 5 * 60 * 1000),
      used: false
    })
    
    

    const resetLink = `http://localhost:5173/user/reset-password?token=${token}`;

    const sendData: ISendEMAIL = {
      email: email,
      subject: "Reset Password",
      text: "reset password",
      html: `<p>Your password reset link: <a href="${resetLink}">${resetLink}</a><br>This link will expire in 5 minutes.</p>`
    }



    await sendEmail(sendData)

  }

  async fogetPassword(token: string, password: string): Promise<string> {

    const curToken = await this.resetRepo.validate(token)

    if(!curToken){
      throw new CustomError(ResponseMessages.BAD_REQUEST, HttpStatusCode.BAD_REQUEST);
    }
    await this.resetRepo.markUsed(curToken.id!)
    const haspsd = await hashPassword(password)
    
    const updateData = await this.userRepo.resetPassword(curToken.userId, haspsd)

    if(!updateData){
      throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }

    return updateData.role

  }

}

