import { Component, Input, OnInit } from "@angular/core";
import { System} from "../models/system";
import { SystemValidationService } from "../services/system-validation.service";

@Component({
    moduleId: module.id,
    selector: "system-comp",
    templateUrl: "../templates/system.component.html"
})
export class SystemComponent implements OnInit {
    @Input() system: System;
    nearestSystems: System[];
    isSystemValidated: boolean;
    error: any;

    constructor(private systemService: SystemValidationService) {
        this.isSystemValidated = false;
    }

    validateSystem(): void {
        this.systemService.validate(this.system.name)
                          .then(systems => {
                              this.nearestSystems = systems
                              this.isSystemValidated = true;
                              this.error = null;
                              
                          })
                          .catch(error => this.error = error);
    }

    ngOnInit(): void {
        this.system = new System();
    }
}