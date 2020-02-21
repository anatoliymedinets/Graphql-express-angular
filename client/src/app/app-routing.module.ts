import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviePageComponent } from './movie-page/movie-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'movie', component: MoviePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
