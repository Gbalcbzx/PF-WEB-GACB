import { Routes } from '@angular/router';
import { MoviesComponent } from './page/movies/movies.component';
import { MovieDetailsComponent } from './page/movie-detail/movie-detail.component';
import { NovedadesPopularesComponent } from './page/novedades-populares/novedades-populares.component';
import { PrincipalSeriesComponent } from './page/principal-series/principal-series.component';

export const routes: Routes = [
  {   path: "",
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  { path: 'inicio', component: MoviesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent},
  { path: 'novedades', component: NovedadesPopularesComponent},
  { path: 'series', component: PrincipalSeriesComponent},
  { path: '**', redirectTo: 'inicio' }

];
