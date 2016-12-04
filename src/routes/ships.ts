"use strict";


import * as express from "express";

import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";
import * as ShipNames from "./shipnames";
//import ShipSubmissionForm from "../../schemas/shipyard-v2.0.json";
//const 

const UPLOAD_URL = "http://eddn-gateway.elite-markets.net:8080/upload/";
module Routes {
  export class ShipsRoute {

    /**
     * @api {get} api/ships/ Get list of all ships
     * @apiName GetShipListing
     * @apiGroup Ships
     * 
     * @apiSuccess {Array} ships List of the ships
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
     * @apiParam {JSON} system System name {"system": {"name": name }}
     * @apiParam {JSON} station Station name {"station": {"name": name }}
     * @apiParam {Array} ships List of ships available

     * @apiError (400) BadRequest Required data is missing
     */
    public async sendCorrection(req: express.Request, res: express.Response, next: express.NextFunction) {
     // var form: JSON = await WebRequest.json<any>("https://raw.githubusercontent.com/jamesremuscat/EDDN/master/schemas/shipyard-v2.0.json");
      console.log("Updating ship listing");
      let ships = req.body.ships;
      let station: string = req.body.station.name;
      let system = req.body.system.name;
      let shipSymbols: string[] = [];
      if (!station || !system) {
        //Send error code 
        console.log("Error, missing data");
       res.status(400).send({error: "Missing data"});
       // res.err("Insufficient data, update rejected");
      } else {

      for (let ship of ships){
        //console.log(ship.name);
        //console.log(ShipNames.translateActualToSymbolic(ship.name));
        shipSymbols.push(ShipNames.translateActualToSymbolic(ship.name));
      }
      let form2 = JSON.stringify({
         header: {
        uploaderID: "Useless Zero",
        softwareName: "EDDataUpdater",
        softwareVersion: "0.0.1"},
       message: { systemName: system,
          stationName: station,
          timestamp: new Date(),
          ships: shipSymbols
        }
      });
    //  console.log(form2);
      //await WebRequest.post(UPLOAD_URL, null, form);
      res.send("Data sent succescfully!");
    }
    }
  }
}
export { Routes };
//export = { Routes };