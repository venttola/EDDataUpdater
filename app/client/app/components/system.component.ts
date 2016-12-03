import { Component, Input, OnInit } from "@angular/core";
import { System} from "../models/System";
import { SystemValidationService } from "../services/system-validation.service";

@Component({
    moduleId: module.id,
    selector: "system-comp",
    templateUrl: "../templates/system.component.html"
})
export class SystemComponent implements OnInit {
    @Input() system: System;
    nearestSystems: System[];
    error: any;

    constructor(private systemService: SystemValidationService) {

    }

    validateSystem(): void {
        this.systemService.validate(this.system.name)
                          .then(systems => this.nearestSystems = systems)
                          .catch(error => this.error = error);
    }

    ngOnInit(): void {
        this.system = new System();
    }
}