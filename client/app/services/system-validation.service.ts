import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';

import { System } from "../models/system";

@Injectable()
export class SystemValidationService {
    constructor(private http: Http) { }

    validate(name: string): Promise<System[]> {
        return this.http
                   .get(`/api/system/${name}`)
                   .toPromise()
                   .then(response => response.json() as System[])
                   .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}