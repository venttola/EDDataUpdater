"use strict";


import * as express from "express";

import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";
//import Promise from "ts-promise";


const EDSM_URL_BASE_OLD : string = "https://www.edsm.net/api-v1/";
const EDSM_URL_BASE_NEW : string = "";
const AMOUNT_OF_NEAREST : number = 3;
module Routes {

 interface SystemWithDistance {
      name: string;
      distance: number;
  }
  interface SystemWithCoordinates {
    name: string;
    coords: {
      x: number;
      y: number;
      z: number;
    };
  }
  export class SystemRoute {

    /**
     * @api {get} api/system/:name Check system name validity
     * @apiName CheckSystemValidity
     * @apiGroup System
     * 
     * @apiParam {String} name System name
     * 
     * @apiSuccess {json} nearestNeighbours List of the 3 nearest system names and their distances form origin.
     * @apiError (404) SystemNotFound System was not found
     */
    public async checkSystemValidity(req: express.Request, res: express.Response, next: express.NextFunction) {

      console.log("Checking is system " + req.params.name + " is valid.");
      var parameter : string = "system?systemName=" + req.params.name + "\n";
      var result = await WebRequest.get(EDSM_URL_BASE_OLD + parameter);
      if (result.content === "[]") {
        console.log("No system found!");
        res.status(404).send({error: "System not found!"});
      } else {
        console.log("Getting nearest neighbours for " + req.params.name );
        //Needs some system here to actually calculate the nearest ones 
        let nearestSystems = await SystemRoute.prototype.getNearest(req.params.name);
        res.header("Content-Type", "application/json");
        res.send(nearestSystems);
     }
    }
     private async getNearest(systemName: string): Promise<string> {
          //DoStull
        var parameter : string = "sphere-systems?systemName" + systemName + "&radius=10" + "&coords=1";
        let result = await WebRequest.json<any>(EDSM_URL_BASE_OLD + parameter);
       // console.log(result);
       let base: SystemWithCoordinates;
        for (var quote of result) {
         // console.log(quote.name);
          if (quote.name === systemName) {
              base = quote;
          }
        }
        let systemList: SystemWithDistance[] = [];
        for (var quote of result) {
          let distance = await this.calculateDistance(
            Number(base.coords.x),
            Number(base.coords.y),
            Number(base.coords.z),
            Number(quote.coords.x),
            Number(quote.coords.y),
            Number(quote.coords.z));
          if ((systemList.length === 0 || systemList.length < AMOUNT_OF_NEAREST) && quote.name !== systemName) {
            let nearSystem: SystemWithDistance = {name: quote.name, distance: distance };
            systemList.push(nearSystem);

          } else if (quote.name !== systemName) {
            for (let system of systemList) {
               if (distance < system.distance && quote.name !== system.name) {
                 let nearSystem: SystemWithDistance = {name: quote.name, distance: distance };
                 systemList.push(nearSystem);
                 systemList = systemList.sort((system1, system2) => {
                   if (system1.distance > system2.distance) {
                     return 1;
                   }
                   if (system1.distance < system2.distance) {
                     return -1;
                   }
                   return 0;
                   });
                 systemList.pop();
                 break;
               }
            }
          }
          systemList = systemList.sort((system1, system2) => {
            if (system1.distance > system2.distance) {
              return 1;
            }
            if (system1.distance < system2.distance) {
              return -1;
            }
            return 0;
          });
          }
       console.log (JSON.stringify(systemList));
        return JSON.parse(JSON.stringify(systemList));
      }
      private async calculateDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Promise<number> {
        return Number(Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)).toFixed(2));
      }
  }

}
export { Routes };
//export = Routes;