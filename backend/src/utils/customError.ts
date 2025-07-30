import { Response } from "express";

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
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}