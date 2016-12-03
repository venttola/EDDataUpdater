import { Component, Input, OnInit } from "@angular/core";

import { Station } from "../models/station";
import { Ship } from "../models/ship";

import { ShipDataService } from "../services/shipdata.service";

@Component({
    moduleId: module.id,
    selector: "shipdata-comp",
    templateUrl: "../templates/shipdata.component.html"
})
export class ShipDataComponent implements OnInit {
    @Input() station: Station;
    shiplist: Ship[];
    addedShips: Ship[];
    error: any;
    isSystemValidated: boolean;

    constructor(private shipService: ShipDataService) {}

    ngOnInit(): void {
        this.station = new Station();
        this.addedShips = [];

        this.getShips();
    }

    getShips(): void {
        this.shipService
            .getShips()
            .then(ships => this.shiplist = ships)
            .catch(error => this.error = error);
    }

    addShip(ship: Ship): void {
        if(this.addedShips.indexOf(ship) == -1) {
            this.addedShips.push(ship);
        }
    }

    sendData(): void {
        this.shipService
            .postShips(this.addedShips, this.station)
            .then(res => this.addedShips = [])
            .catch(error => this.error);
    }
}