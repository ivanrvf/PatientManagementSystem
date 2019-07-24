import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {routing} from "./auth.routing";
import { AuthComponent } from './auth.component';
import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
      routing,
      SharedModule
  ],
  declarations: []
})
export class AuthModule { }
