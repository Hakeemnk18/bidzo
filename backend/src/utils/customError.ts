import { Response } from "express";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
  }
}


export const handleError = (res: Response, err: unknown): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: ResponseMessages.SERVER_ERROR });
  }
}