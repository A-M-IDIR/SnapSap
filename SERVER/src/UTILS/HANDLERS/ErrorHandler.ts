import { Response } from "express";

export default function ErrorHandler(
  res: Response,
  statusCode: number,
  message: string
): Response {
  res.status(statusCode);
  throw new Error(message);
}
