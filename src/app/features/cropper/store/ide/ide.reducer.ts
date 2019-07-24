import { IdeActions, IdeActionTypes } from "./ide.actions";

export interface IdeState {
  aspectRatios: Array<any>;
  viewModes: Array<any>;
  images: Array<string>;
  selectedImage: string;
  options: any;
  crop: any;
}

export const initialState: IdeState = {
  aspectRatios: [
    { name: "16:9", val: 16 / 9 },
    { name: "4:3", val: 4 / 3 },
    { name: "1:1", val: 1 / 1 },
    { name: "2:3", val: 2 / 3 },
    { name: "free", val: NaN }
  ],
  viewModes: [
    { name: "VM0", val: 0 },
    { name: "VM1", val: 1 },
    { name: "VM2", val: 2 },
    { name: "VM3", val: 3 }
  ],
  images: [
    "/assets/img/superbox/superbox-full-7.jpg",
    "/assets/img/superbox/superbox-full-9.jpg",
    "/assets/img/superbox/superbox-full-10.jpg",
    "/assets/img/superbox/superbox-full-11.jpg",
    "/assets/img/superbox/superbox-full-13.jpg",
    "/assets/img/superbox/superbox-full-16.jpg",
    "/assets/img/superbox/superbox-full-18.jpg",
    "/assets/img/superbox/superbox-full-19.jpg",
    "/assets/img/superbox/superbox-full-23.jpg",
    "/assets/img/superbox/superbox-full-1.jpg",
    "/assets/img/superbox/superbox-full-2.jpg",
    "/assets/img/superbox/superbox-full-3.jpg",
    "/assets/img/superbox/superbox-full-4.jpg",
    "/assets/img/superbox/superbox-full-12.jpg",
    "/assets/img/superbox/superbox-full-14.jpg",
    "/assets/img/superbox/superbox-full-15.jpg",
    "/assets/img/superbox/superbox-full-17.jpg",
    "/assets/img/superbox/superbox-full-20.jpg",
    "/assets/img/superbox/superbox-full-6.jpg",
    "/assets/img/superbox/superbox-full-8.jpg",
    "/assets/img/superbox/superbox-full-22.jpg",
    "/assets/img/superbox/superbox-full-24.jpg"

  ],
  selectedImage: "/assets/img/superbox/superbox-full-7.jpg",

  crop: {
    x: null,
    y: null,
    width: null,
    height: null,
    rotate: null,
    scaleX: 1,
    scaleY: 1
  },

  options: {
    aspectRatio: 16 / 9,
    viewMode: 0,


    responsive: true,
    restore: true,
    checkCrossOrigin: true,
    checkOrientation: true,
    modal: true,
    guides: true,
    center: true,
    highlight: true,
    background: true,
    autoCrop: true,
    movable: true,
    rotatable: true,
    scalable: true,
    zoomable: true,
    zoomOnTouch: true,
    zoomOnWheel: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: true
  }
};

export function reducer(state = initialState, action: IdeActions): IdeState {
  switch (action.type) {
    case IdeActionTypes.SelectImage:
      return {
        ...state,
        selectedImage: action.payload
      };

    case IdeActionTypes.OptionsChange:
      return {
        ...state,
        options: { ...action.payload }
      };

    case IdeActionTypes.OnCrop:
      return {
        ...state,
        crop: {
          x: action.payload.x ? Math.round(action.payload.x) : 0,
          y: action.payload.y ? Math.round(action.payload.y) : 0,
          width: action.payload.width ? Math.round(action.payload.width) : 0,
          height: action.payload.height ? Math.round(action.payload.height) : 0,
          rotate: action.payload.rotate ? Math.round(action.payload.rotate) : 0,
          scaleX: action.payload.scaleX || 1,
          scaleY: action.payload.scaleY || 1
        }
      };

    default:
      return state;
  }
}
