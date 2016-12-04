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

    /**
     * @api {get} api/ships/ Get list of all ships
     * @apiName GetShipListing
     * @apiGroup Ships
     * 
     * @apiSuccess {List} ships List of the ships
     */
    public async getShipListing(req: express.Request, res: express.Response, next: express.NextFunction) {
      console.log("Returning ship listing.");
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(ShipNames.ACTUAL_SHIP_NAMES));
    }

    /**
     * @api {post} api/ships/ Send corrected ship data
     * @apiName SendCorrection
     * @apiGroup Ships
     * 
     * @apiParam {String} station Station name
     * @apiParam {List} ships List of ships available
     */
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