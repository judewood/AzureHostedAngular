import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoderRoutingModule } from './decoder-routing.module';
import { DecoderComponent } from './decoder.component';


@NgModule({
  declarations: [DecoderComponent],
  imports: [
    CommonModule,
    DecoderRoutingModule
  ]
})
export class DecoderModule { }
