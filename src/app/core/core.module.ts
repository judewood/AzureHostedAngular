import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService, UtilsService, ArrayUtilsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LogService,
    UtilsService,
    ArrayUtilsService
  ]
})
export class CoreModule { }
