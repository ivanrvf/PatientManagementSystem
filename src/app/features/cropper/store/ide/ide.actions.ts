import { Action } from "@ngrx/store";

export enum IdeActionTypes {
  SelectImage = "[Ide] Select Image",
  OptionsChange = "[Ide] Options Change",
  OnCrop = "[Ide] On Crop",
}

export class SelectImage implements Action {
  readonly type = IdeActionTypes.SelectImage;
  constructor(readonly payload: any) {}
}

export class OptionsChange implements Action {
  readonly type = IdeActionTypes.OptionsChange;
  constructor(readonly payload: any) {}
}


export class OnCrop implements Action {
  readonly type = IdeActionTypes.OnCrop;
  constructor(readonly payload: any) {}
}

export type IdeActions = SelectImage | OptionsChange |  OnCrop;
