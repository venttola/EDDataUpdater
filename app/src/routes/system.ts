"use strict";


import * as express from "express";

import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";


const EDSM_URL_BASE_OLD : string = "https://www.edsm.net/api-v1/";
const EDSM_URL_BASE_NEW : string = "";


module Routes {
  export class SystemRoute {

    public async checkSystemValidity(req: express.Request, res: express.Response, next: express.NextFunction) {
    	console.log("Checking is system " + req.params.name + " is valid.");
    	var parameter : string = "systems?systemName=" + req.params.name;
     	var result = await WebRequest.get(EDSM_URL_BASE_OLD + parameter);

     	console.log(result.content);
  	 	res.send(result.content);
    }

    public async getNearestNeighbours(req: express.Request, res: express.Response, next: express.NextFunction) {
    	console.log("Getting " + req.params.amount + "nearest neighbours for" + req.params.name);
    	var parameter : string = "sphere-systems?systemName" + req.params.name + "&radius=20" + "&coods=1";
    	var result = await WebRequest.get(EDSM_URL_BASE_OLD + parameter);
    	console.log(result.content);
    	//Add here a parsing function to figure out n nearest neighbours.
    	res.send(result.content);

    }
  }

}
export { Routes };
//export = Routes;