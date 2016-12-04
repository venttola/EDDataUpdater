"use strict";


import * as express from "express";

import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";
import * as ShipNames from "./shipnames";
//import ShipSubmissionForm from "../../schemas/shipyard-v2.0.json";
//const 
module Routes {
  export class ShipsRoute {

    public async getShipListing(req: express.Request, res: express.Response, next: express.NextFunction) {
      console.log("Returning ship listing.");
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(ShipNames.ACTUAL_SHIP_NAMES));
    }

    public async sendCorrection(req: express.Request, res: express.Response, next: express.NextFunction) {
      var form: JSON = await WebRequest.json<any>("https://raw.githubusercontent.com/jamesremuscat/EDDN/master/schemas/shipyard-v2.0.json");
      console.log("Updating ship listing");
      console.log(req.body);
      //console.log (ShipNames.translateActualToSymbolic(req.params.data));
      res.send("bar");
    }

  }
}
export { Routes };
//export = { Routes };