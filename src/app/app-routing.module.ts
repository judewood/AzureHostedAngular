import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) }, 
{ path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }, 
{ path: 'highscores', loadChildren: () => import('./highscores/highscores.module').then(m => m.HighscoresModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
