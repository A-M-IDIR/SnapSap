/****************** SHARED DEPENDENCIES ******************/
import ENV from "dotenv";
import COLORS from "colors";

ENV.config();
/****************** SHARED DEPENDENCIES ******************/

/****************** SERVER LAUNCH ******************/
import EXPRESS, { Request, Response } from "express";
import HTTP from "http";
import CORS from "cors";
import Error from "./UTILS/MIDDLEWARE/Error.js";

const PORT = process.env.PORT || 5000;
const BASE_ROUTE = "/";

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);

APP.use(EXPRESS.json());
APP.use(
  CORS({
    origin: "*",
  })
);

APP.get(BASE_ROUTE, (req: Request, res: Response) => {
  res.status(200).send("WELCOME TO THE SNAP-SAP API !");
});

APP.use(Error);

SERVER.listen(PORT, () => {
  console.log(COLORS.green.underline(`APP STARTED AT PORT :: ${PORT}.`));
});
/****************** SERVER LAUNCH ******************/

/****************** DATA-BASE CONN *****************/
import MONGOOSE from "mongoose";

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
