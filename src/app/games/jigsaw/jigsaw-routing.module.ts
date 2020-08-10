import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JigsawComponent } from './jigsaw.component';

const routes: Routes = [
{ path: '', component: JigsawComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JigsawRoutingModule { }
