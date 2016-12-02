"use strict";

import * as express from "express";

import * as testRoute from "./routes/testRoute";
import * as system from "./routes/system";
import Promise from "ts-promise";

class Server {
	public app: express.Application;
	constructor() {
		this.app = express();
		this.setRoutes();
	}

	public static init(): Server {
    	return new Server();
  	}

	private setRoutes() {
		let router: express.Router;
	    router = express.Router();

	    // Define routes here
	    var test: testRoute.TestRoute = new testRoute.TestRoute();
	    var systemCheck: system.SystemRoute = new system.SystemRoute();
	    router.get("/api/test", test.test);
	    router.get("/api/system/:name", systemCheck.checkSystemValidity);
	    router.get("/api/system/:name/:amount", systemCheck.getNearestNeighbours);
	    this.app.use(router);
	}
}

var server = Server.init();
export = server.app;