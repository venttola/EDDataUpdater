import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent }  from "./app.component";
import { SystemComponent } from "./components/system.component"
import { SystemValidationService } from "./services/system-validation.service";

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    SystemComponent
  ],
  providers: [
    SystemValidationService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
