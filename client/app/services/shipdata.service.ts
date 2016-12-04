import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';

import { Ship } from "../models/ship";
import { Station } from "../models/station";

@Injectable()
export class ShipDataService {
    constructor(private http: Http) { }

    getShips(): Promise<Ship[]> {
        return this.http
                   .get(`/api/ships/`)
                   .toPromise()
                   .then(response => {
                       let shiplist: Ship[] = [];

                       for(let name of response.json()) {
                           shiplist.push(new Ship(name));
                       }

                       return shiplist;
                   })
                   .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    postShips(ships: Ship[], station: Station): Promise<number> {
        let data = { station, ships };
        console.log(JSON.stringify(data));

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
                   .post(`/api/ships/`, JSON.stringify(data), { headers: headers })
                   .toPromise()
                   .then(res => res.status)
                   .catch(this.handleError);
    }
}