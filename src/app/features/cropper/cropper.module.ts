import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromIde from './store/ide/ide.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IdeEffects } from './store/ide/ide.effects';
import {FormsModule} from '@angular/forms';
import { CropperComponent } from './components/cropper/cropper.component'

import { CropperPageComponent } from './containers/cropper-page/cropper-page.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CropperPageComponent}]),
    StoreModule.forFeature('ide', fromIde.reducer),
    EffectsModule.forFeature([IdeEffects]),
    FormsModule,
    SharedModule
  ],
  declarations: [CropperPageComponent, CropperComponent]
})
export class CropperModule { }
