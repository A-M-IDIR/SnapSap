/****************** SHARED DEPENDENCIES ******************/
import ENV from "dotenv";
import COLORS from "colors";

ENV.config();
/****************** SHARED DEPENDENCIES ******************/

/****************** SERVER LAUNCH ******************/
import EXPRESS from "express";
import HTTP from "http";
import CORS from "cors";
import Error from "./UTILS/MIDDLEWARES/Error.js";
import { RouterHandler } from "./UTILS/HANDLERS/RouterHandler.js";

const PORT = process.env.PORT || 5000;
const APP_NAME = "SNAP-SAP";
const BASE_ROUTE = "/";

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);

APP.use(EXPRESS.json());
APP.use(
  CORS({
    origin: "*",
  })
);

GreetHandler(APP, BASE_ROUTE, APP_NAME);
RouterHandler(APP, BASE_ROUTE);

APP.use(Error);

SERVER.listen(PORT, () => {
  console.log(COLORS.green.underline(`SERVER STARTED AT PORT :: ${PORT}.`));
});
/****************** SERVER LAUNCH ******************/

/****************** DATA-BASE CONN *****************/
import MONGOOSE from "mongoose";
import { GreetHandler } from "./UTILS/HANDLERS/GreetHandler.js";

const MONGO_URI = process.env.MONGO_URI;

MONGOOSE.connect(MONGO_URI)
  .then(() => {
    console.log(COLORS.green.underline(`MONGO-DB CONNECTED.`));
  })
  .catch((error) => {
    console.log(
      COLORS.red.underline(`MONGO-DB FAILED TO CONNECT :: ${error.message}`)
    );
    process.exit(1);
  });
/****************** DATA-BASE CONN *****************/
