"use strict";

import * as express from "express";

//import * as testRoute from "./routes/testRoute";
import * as system from "./routes/system";
import * as ships from "./routes/ships";
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
	    //var test: testRoute.TestRoute = new testRoute.TestRoute();
	    var systemsAPI: system.Routes.SystemRoute = new system.Routes.SystemRoute();
	    var shipsAPI : ships.Routes.ShipsRoute = new ships.Routes.ShipsRoute();
	   // router.get("/api/test", test.test);
	    router.get("/api/system/:name", systemsAPI.checkSystemValidity);
	    router.get("/api/system/:name/:amount", systemsAPI.getNearestNeighbours);
	    router.get("/api/ships/", shipsAPI.getShipListing);
	    router.post("/api/ships/:system", shipsAPI.sendCorrection);
	    this.app.use(router);
	}
}

var server = Server.init();
//export default Server;
export = server.app;