import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HighscoresComponent } from './highscores.component';

const routes: Routes = [{ path: '', component: HighscoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighscoresRoutingModule { }
