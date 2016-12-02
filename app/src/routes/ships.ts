"use strict";


import * as express from "express";

import * as http from "http";
import * as https from "https";
import * as WebRequest from "web-request";


//const 
module Routes {
  export class ShipsRoute {

    public async getShipListing(req: express.Request, res: express.Response, next: express.NextFunction) {
    	console.log("Returning ship listing.");
  	 	res.send("foo");
    }
    public async sendCorrection(req: express.Request, res: express.Response, next: express.NextFunction) {

      console.log("Updating ship listing");
      res.send("bar");
    }

  }
}
export { Routes };
//export = { Routes };