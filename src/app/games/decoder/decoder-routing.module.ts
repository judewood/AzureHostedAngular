import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecoderComponent } from './decoder.component';

const routes: Routes = [{ path: '', component: DecoderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoderRoutingModule { }
