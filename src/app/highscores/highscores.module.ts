import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighscoresRoutingModule } from './highscores-routing.module';
import { HighscoresComponent } from './highscores.component';


@NgModule({
  declarations: [HighscoresComponent],
  imports: [
    CommonModule,
    HighscoresRoutingModule
  ]
})
export class HighscoresModule { }
