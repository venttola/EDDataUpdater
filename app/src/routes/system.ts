"use strict";


import * as express from "express";

import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";
//import Promise from "ts-promise";


const EDSM_URL_BASE_OLD : string = "https://www.edsm.net/api-v1/";
const EDSM_URL_BASE_NEW : string = "";


module Routes {

  interface Coordinate {
      x: "00.000";
      y: "00.000";
      z: "00.000";
  }
  export class SystemRoute {

    public async checkSystemValidity(req: express.Request, res: express.Response, next: express.NextFunction) {

      console.log("Checking is system " + req.params.name + " is valid.");
      var parameter : string = "system?systemName=" + req.params.name + "\n";
      var result = await WebRequest.get(EDSM_URL_BASE_OLD + parameter);
      if (result.content === "[]") {
        console.log("No system found!");
        res.status(404).send({error: "System not found!"});
      } else {
        console.log("Return dummy data");
        console.log("Getting nearest neighbours for " + req.params.name );
        //Needs some system here to actually calculate the nearest ones 
        let nearestSystems = await SystemRoute.prototype.getNearest(req.params.name);
        res.header("Content-Type", "application/json");
        res.send(nearestSystems);
     }
    }
     private async getNearest(system: string): Promise<string> {
          //DoStull
        var parameter : string = "sphere-systems?systemName" + system + "&radius=10" + "&coords=1";
        let result = await WebRequest.json<any>(EDSM_URL_BASE_OLD + parameter);
        console.log(result);
       for (var quote of result){
          console.log(quote.name);
       }
        return JSON.stringify([{"system1": "System1", "system2": "System2"}]);
      }
  }

}
export { Routes };
//export = Routes;