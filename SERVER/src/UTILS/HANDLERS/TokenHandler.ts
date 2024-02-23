import { Request } from "express";
import JWT from "jsonwebtoken";

const Generate = (id: string) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const Split = (req: Request) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    return authorizationHeader.split(" ")[1];
  }

  return null;
};

const Decrypt = (token: string) => {
  return JWT.verify(token, process.env.JWT_SECRET) as {
    id: string;
  };
};

export const TokenHandler = {
  Generate,
  Split,
  Decrypt,
};
