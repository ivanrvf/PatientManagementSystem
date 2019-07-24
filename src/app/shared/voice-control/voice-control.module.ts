import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule, PopoverModule } from "ngx-bootstrap";

import { SpeechButtonComponent } from "./speech-button/speech-button.component";

@NgModule({
  imports: [CommonModule, ModalModule, PopoverModule],
  exports: [SpeechButtonComponent],
  declarations: [SpeechButtonComponent],
  providers: []
})
export class VoiceControlModule {}
