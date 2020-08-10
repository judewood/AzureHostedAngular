import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games.component';

const routes: Routes = [
{ path: 'decoder', loadChildren: () => import('./decoder/decoder.module').then(m => m.DecoderModule) }, 
{ path: 'jigsaw', loadChildren: () => import('./jigsaw/jigsaw.module').then(m => m.JigsawModule) },
{ path: '', component: GamesComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
