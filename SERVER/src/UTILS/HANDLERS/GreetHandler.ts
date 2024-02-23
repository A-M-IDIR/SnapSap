import { Request, Response, Express } from "express";
import { Routers } from "./RouterHandler.js";

export default function GreetHandler(
  APP: Express,
  BASE_ROUTE: string,
  APP_NAME: string
) {
  APP.get(BASE_ROUTE, (req: Request, res: Response) => {
    let Message = `
    -------------------------------------------------------------
    WELCOME TO THE ${APP_NAME} API !
    -------------------------------------------------------------
    
    HERE IS A LIST OF ALL THE ROUTES :: | `;

    for (let key in Routers) {
      Message += `/${key} | `;
    }

    res.status(200).send(Message);
  });
}
