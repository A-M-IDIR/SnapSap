import { Request, Response, NextFunction } from "express";
import COLORS from "colors";

function Error(err: Error, req: Request, res: Response, next: NextFunction) {
  // INTEGRATE THIS LATER WITH THE ERROR-HANDLER
  if (process.env.NODE_ENV === "DEV") {
    const Location = err.stack
      ? err.stack
          .split("\n")[1]
          .replace(/^\s*at\s+/i, "")
          .trim()
      : "UNKNOWN";

    console.error(
      COLORS.red(
        `${COLORS.underline(`${err.message.toUpperCase()} AT ::`)} ${Location}`
      )
    );
  }

  const StatusCode =
    res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;

  res.status(StatusCode);
  res.json({
    errors: [{ msg: err.message }],
    stack: process.env.NODE_ENV === "PROD" ? null : err.stack,
  });
}

export default Error;
