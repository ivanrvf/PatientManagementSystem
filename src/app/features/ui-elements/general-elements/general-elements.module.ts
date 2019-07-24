import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generalElementsRouting } from './general-elements.routing';
import {GeneralElementsComponent} from "./general-elements.component";
import {AccordionModule, CarouselModule, PopoverModule} from "ngx-bootstrap";
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    generalElementsRouting,
    SharedModule,
    AccordionModule.forRoot(),
    PopoverModule.forRoot(),

    CarouselModule.forRoot(),
  ],
  declarations: [GeneralElementsComponent]
})
export class GeneralElementsModule { }
