import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnDestroy,
  TemplateRef
} from "@angular/core";

import * as Cropper from "cropperjs/dist/cropper.min";
import { debounceTime } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "sa-cropper",
  templateUrl: `./cropper.component.html`,
  styleUrls: ["./cropper.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CropperComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public cropper;
  @Input() state: any;

  @Output() onReady = new EventEmitter();
  @Output() onCropstart = new EventEmitter();
  @Output() onCropmove = new EventEmitter();
  @Output() onCropend = new EventEmitter();
  @Output() onCrop = new EventEmitter();
  @Output() onOptionsChange = new EventEmitter();
  @Output() onZoom = new EventEmitter();
  cropDeounce$ = new Subject();

  @ViewChild("img") img;
  @ViewChild("download") download;
  @ViewChild("template") template;
  @ViewChild("viewport") viewport;

  modalRef: BsModalRef;
  
  putData = {};

  hasFileURL = true;
  disabled = false;

  private optionsDefault = {
    preview: ".img-preview",
    ready: e => {
      // console.log(e.type);
      this.onReady.emit(this.cropper);
    },
    cropstart: e => {
      // console.log(e.type, e.detail.action);
      this.onCropstart.emit(e);
    },
    cropmove: e => {
      // console.log(e.type, e.detail.action);
      this.onCropmove.emit(e);
    },
    cropend: e => {
      // console.log(e.type, e.detail.action);
      this.onCropend.emit(e);
    },
    crop: e => {
      this.cropDeounce$.next(e.detail);
    },

    zoom: e => {
      this.onZoom.emit(e);
      // console.log(e.type, e.detail.ratio);
    }
  };

  public downloadImageHref;
  public uploadedImageName = "cropped.jpg";
  private originalImageURL;
  private uploadedImageType = "image/jpeg";
  private uploadedImageURL;

  togglableOptions = [
    "responsive",
    "restore",
    "checkCrossOrigin",
    "checkOrientation",
    "modal",
    "guides",
    "center",
    "highlight",
    "background",
    "autoCrop",
    "movable",
    "rotatable",
    "scalable",
    "zoomable",
    "zoomOnTouch",
    "zoomOnWheel",
    "cropBoxMovable",
    "cropBoxResizable",
    "toggleDragModeOnDblclick"
  ];

  constructor(private modalService: BsModalService) {
    this.cropDeounce$.pipe(debounceTime(200)).subscribe(this.onCrop);
    this.hasFileURL = !!URL;
  }

  ngOnInit() {}

  ngOnChanges(changes) {
    if(changes.state.previousValue && changes.state.currentValue.selectedImage !== changes.state.previousValue.selectedImage){
      this.updateImage(changes.state.currentValue.selectedImage)
    }
  }

  updateImage(image) {
    this.originalImageURL = image
    this.cropper.replace(image);
  }

  ngAfterViewInit(): void {
    this.originalImageURL = this.img.nativeElement.src;
    
    this.cropper = new Cropper(this.img.nativeElement, {
      ...this.optionsDefault,
      ...this.state.options
    });
  }

  rotate(deg) {
    const cropped = this.cropper.cropped;
    if (cropped && this.state.options.viewMode > 0) {
      this.cropper.clear();
    }
    this.cropper.rotate(deg);
    if (cropped && this.state.options.viewMode > 0) {
      this.cropper.crop();
    }
  }

  getCroppedCanvas(data) {
    if (this.uploadedImageType === "image/jpeg") {
      data.fillColor = "#fff";
    }
    const result = this.cropper.getCroppedCanvas(data);

    if (result) {
      let sub1 = this.modalService.onShown.subscribe(() => {
        const vp = document.querySelector(".modal-body.viewport");
        vp.innerHTML = "";
        vp.appendChild(result);
      });
      this.modalRef = this.modalService.show(this.template);

      let sub2 = this.modalService.onHidden.subscribe((reason: string) => {
        sub1.unsubscribe();
        sub2.unsubscribe();
      });

      this.downloadImageHref = result.toDataURL(this.uploadedImageType);
    }
  }

  detach() {
    this.cropper = null;
    if (this.uploadedImageURL) {
      URL.revokeObjectURL(this.uploadedImageURL);
      this.uploadedImageURL = "";
      this.img.nativeElement.src = this.originalImageURL;
    }
  }

  toggleOption(option) {
    this.setOption(option, !this.state.options[option]);
  }

  setOption(option, value) {
    let cropBoxData = this.cropper.getCropBoxData();
    let canvasData = this.cropper.getCanvasData();
    let options = {
      ...this.optionsDefault,
      ...this.state.options,
      [option]: value,
      ready: () => {
        this.cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        this.onReady.emit(this.cropper);
      }
    };
    this.cropper.destroy();
    this.cropper = new Cropper(this.img.nativeElement, options);
    this.onOptionsChange.emit(options);
  }

  keyboardNav = event => {
    var e = event || window.event;

    // if (!this.cropper || this.scrollTop > 300) {
    //   return;
    // }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        this.cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        this.cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        this.cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        this.cropper.move(0, 1);
        break;
    }
  };

  onFileChange(e) {
    const files = e.target.files;

    if (this.cropper && files && files.length) {
      let file = files[0];

      if (/^image\/\w+/.test(file.type)) {
        this.uploadedImageType = file.type;
        this.uploadedImageName = file.name;

        if (this.uploadedImageURL) {
          URL.revokeObjectURL(this.uploadedImageURL);
        }

        this.img.nativeElement.src = this.uploadedImageURL = URL.createObjectURL(
          file
        );
        this.cropper.destroy();
        this.cropper = new Cropper(this.img.nativeElement, {
          ...this.optionsDefault,
          ...this.state.options
        });
        e.target.value = null;
      } else {
        window.alert("Please choose an image file.");
      }
    }
  }

  putDataChange($event){
    try{
      this.putData = JSON.parse($event.target.value)
    } catch(e){
      this.putData= ''
    }
  }

  ngOnDestroy(): void {
    if (this.uploadedImageURL) {
      URL.revokeObjectURL(this.uploadedImageURL);
    }
  }
}
