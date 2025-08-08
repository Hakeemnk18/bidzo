import 'reflect-metadata';
import { container } from "tsyringe";
import { IOTPRepository } from '../repositories/interfaces/otp.repo.interface';
import { OTPRepository } from '../repositories/OTP.repo';
import { IOTPService } from '../services/interfaces/otp.interface';
import { OTPService } from '../services/otp.service';
import { IAuthService } from '../services/interfaces/auth.interfaces';
import { AuthService } from '../services/auth.service';
import { IUserRepository } from '../repositories/interfaces/user.repo.interface';
import { UserRepository } from '../repositories/user.repo';
import { IJWTService } from '../services/interfaces/jwt.interface';
import { JWTService } from '../services/jwt.service';
import { IResetPasswordRepo } from '../repositories/interfaces/reset.password.repo.interface';
import { ResetRepo } from '../repositories/reset.repo';
import { IUserManagementService } from '../services/interfaces/user.management.interface';
import { UserMangementService } from '../services/user.management,service';

container.register<IOTPRepository>('IOTPRepository', {useClass: OTPRepository})
container.register<IOTPService>('IOTPService', { useClass: OTPService})

container.register<IUserRepository>('IUserRepository', { useClass: UserRepository})
container.register<IJWTService>('IJWTService', { useClass: JWTService})

container.register<IResetPasswordRepo>('IResetPasswordRepo', { useClass: ResetRepo})

container.register<IAuthService>('IAuthService', { useClass: AuthService})

container.register<IUserManagementService>('IUserManagementService', { useClass: UserMangementService})



export { container };


