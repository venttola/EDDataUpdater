import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent }  from "./app.component";

import { SystemComponent } from "./components/system.component"
import { SystemValidationService } from "./services/system-validation.service";

import { ShipDataComponent } from "./components/shipdata.component";
import { ShipDataService } from "./services/shipdata.service";

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    SystemComponent,
    ShipDataComponent
  ],
  providers: [
    SystemValidationService,
    ShipDataService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
