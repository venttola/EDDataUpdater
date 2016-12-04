import { Component, Input, OnInit, OnChanges, SimpleChange } from "@angular/core";

import { Station } from "../models/station";
import { Ship } from "../models/ship";

import { ShipDataService } from "../services/shipdata.service";

@Component({
    moduleId: module.id,
    selector: "shipdata-comp",
    templateUrl: "../templates/shipdata.component.html"
})
export class ShipDataComponent implements OnInit, OnChanges {
    @Input() station: Station;
    @Input() isSystemValidated: boolean;
    shiplist: Ship[];
    addedShips: Ship[];
    error: any;

    constructor(private shipService: ShipDataService) {}

    ngOnInit(): void {
        this.station = new Station();
        this.addedShips = [];
        this.isSystemValidated = false;

        this.getShips();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.isSystemValidated = Boolean(changes["isSystemValidated"]);
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