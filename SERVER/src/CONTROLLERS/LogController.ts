import { Response, Request } from "express";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE LOG ROUTE !
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

export { Greet };
