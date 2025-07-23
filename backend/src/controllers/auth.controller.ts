import { Request, Response } from "express";
import { IAuthController } from "./interfaces/auth.controller.interface";
import { IAuthService } from "../services/interfaces/auth.interfaces";




export class AuthController implements IAuthController {

  constructor(private readonly authService: IAuthService) { }

  async googleLogin(req: Request, res: Response): Promise<void> {

    console.log("inside controller")
    try {
      const { token } = req.body;

      const user = await this.authService.googleLogin({ token });
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
      });
    } catch (err) {
      console.error("Google Login Failed", err);
      console.error("Google login error:", err);
      res.status(500).json({
        success: false,
        message: "Google login failed",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}



// export const userLogin = async (req: Request, res: Response) => {

//   try {
    
//     const { email, password }: UserLoginDTO = req.body;
    
//     const token = await loginUser(email, password, 'user', new UserRepository);
//     res.json({ token });
//   } catch (err: any) {
//     res.status(401).json({ error: err.message });
//   }
// };




// export const googleLogin = async (req: Request, res: Response) => {
//   try {
//     console.log("inside google login")

//     const { token }:GoogleLoginDTO = req.body;
    

//     const { email, name, sub } = await fetchGoogleProfile(token);

//     const newUser = await findOrCreateByGoogle({
//       email,
//       name,
//       googleId: sub,
//       role: "user",
//       repo: new UserRepository(),
//     });

//     const responseUser: UserLoginResponseDTO = {
//       name: newUser.name,
//       role: newUser.role,
//       token: 'hjdf',
//     };
    
//     res.json
    
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ success: false, message: 'Invalid Google token' });
//   }
// };
