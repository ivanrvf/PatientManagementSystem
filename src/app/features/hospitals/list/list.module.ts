import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { SmartadminDatatableModule } from '@app/shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminWizardsModule } from '@app/shared/forms/wizards/smartadmin-wizards.module';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
      CommonModule,
      SharedModule,
      ListRoutingModule,
      NgxDatatableModule,
      SmartadminDatatableModule,
      SmartadminWizardsModule,
      FormsModule,
      ReactiveFormsModule,
      AccordionModule.forRoot(),
      HttpClientModule,
  ],
  declarations: [ListComponent]
})
export class ListModule { }
