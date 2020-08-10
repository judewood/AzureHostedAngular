import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JigsawRoutingModule } from './jigsaw-routing.module';
import { JigsawComponent } from './jigsaw.component';


@NgModule({
  declarations: [JigsawComponent],
  imports: [
    CommonModule,
    JigsawRoutingModule
  ]
})
export class JigsawModule { }
