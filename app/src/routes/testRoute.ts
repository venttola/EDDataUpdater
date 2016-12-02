"use strict";

import * as express from "express";


module Routes {
  export class TestRoute {

    public test(req: express.Request, res: express.Response, next: express.NextFunction) {
    	console.log("Responding");
    	res.send("Hello World!");
    }
  }
}

export = Routes;