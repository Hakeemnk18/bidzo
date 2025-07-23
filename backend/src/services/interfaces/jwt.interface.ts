export interface IJWTService {
  sign(payload: object): string;
  verify(token: string): any;
}