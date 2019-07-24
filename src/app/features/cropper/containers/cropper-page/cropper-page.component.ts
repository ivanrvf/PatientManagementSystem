import { Component, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getIdeState,
  SelectImage,
  OptionsChange,
  OnCrop
} from "@app/features/cropper/store/ide";

import { tap } from "rxjs/operators";

@Component({
  selector: "sa-cropper-page",
  templateUrl: "./cropper-page.component.html",
  styleUrls: ["./cropper-page.component.scss"]
})
export class CropperPageComponent {
  public vm$;

  constructor(private store: Store<any>) {
    this.vm$ = store.select(getIdeState)
  }

  onSelectImage(image) {
    this.store.dispatch(new SelectImage(image));
  }

  onOptionsChange(options) {
    this.store.dispatch(new OptionsChange(options));
  }


  onCrop(e){
    this.store.dispatch( new OnCrop(e))
  }

}
