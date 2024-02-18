import { Express } from "express";
import COLORS from "colors";

import { UserRouter } from "../../ROUTES/UserRoute.js";
import { ProjectRouter } from "../../ROUTES/ProjectRoute.js";
import { LogRouter } from "../../ROUTES/LogRoute.js";
import { IssueRouter } from "../../ROUTES/IssueRoute.js";

const Routers = {
  user: UserRouter,
  project: ProjectRouter,
  log: LogRouter,
  issue: IssueRouter,
};

const RouterHandler = (APP: Express, BASE_ROUTE: string) => {
  for (let key in Routers) {
    APP.use(BASE_ROUTE + key, Routers[key]);
  }

  console.log(COLORS.green.underline(`ROUTERS MOUNTED SUCCESSFULLY.`));
};

export { RouterHandler, Routers };
