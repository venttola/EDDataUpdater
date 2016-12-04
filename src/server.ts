"use strict";

import * as express from "express";

//import * as testRoute from "./routes/testRoute";
import * as system from "./routes/system";
import * as ships from "./routes/ships";
import Promise from "ts-promise";
import * as bodyparser from "body-parser";

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
	    router.get("/api/ships/", shipsAPI.getShipListing);
	    router.post("/api/ships/", shipsAPI.sendCorrection);

		router.get("/",
		(req: express.Request, res: express.Response, next: express.NextFunction) => res.sendFile("index.html", {root: __dirname + "/../client"}));
		router.get("/doc",
		(req: express.Request, res: express.Response, next: express.NextFunction) => res.sendFile("index.html", {root: __dirname + "/../doc"}));

		this.app.use(bodyparser.json()); // Needs to be set before router
	    this.app.use(router);
	}
}

var server = Server.init();
//export default Server;
export = server.app;