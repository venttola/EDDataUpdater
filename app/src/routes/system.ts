"use strict";


import * as express from "express";
import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";


const EDSM_URL_BASE_OLD : string = "https://www.edsm.net/api-v1/system";
const EDSM_URL_BASE_NEW : string = "";


module Routes {
  export class SystemRoute {

    public async checkSystemValidity(req: express.Request, res: express.Response, next: express.NextFunction) {
    	console.log("Checking is system " + req.params.name + " is valid.");
    	var parameter : string = "?systemName=" + req.params.name;
     	var result : JSON = await WebRequest.get(EDSM_URL_BASE_OLD + parameter);

     	console.log(result.body);
    	res.send(result.body);
    }
  }
}

export = Routes;