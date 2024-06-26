import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SharedModule } from '../../shared/shared.module';
import { MayusculasPipe } from "../../pipe/mayusculas.pipe";


@Component({
    selector: 'app-novedades-populares',
    standalone: true,
    templateUrl: './novedades-populares.component.html',
    styleUrl: './novedades-populares.component.css',
    imports: [CommonModule, SharedModule, MayusculasPipe]
})
export class NovedadesPopularesComponent implements OnInit {
  novedadesPeliculas: any[] = [];
  novedadesSeries: any[] = [];
  carouselImage: string = ''; // Nuevo campo para la imagen del carousel

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadNovedades();
  }

  loadNovedades() {
    this.moviesService.getPopularMovies().subscribe(
      (data: any) => {
        this.novedadesPeliculas = data.results.slice(0, 18);
        // Establecer la imagen del carousel
        if (this.novedadesPeliculas.length > 0) {
          this.carouselImage = 'https://image.tmdb.org/t/p/original/' + this.novedadesPeliculas[2].backdrop_path;
        }
      },
      (error) => {
        console.error('Error fetching popular movies', error);
      }
    );

    this.moviesService.getPopularSeries().subscribe(
      (data: any) => {
        this.novedadesSeries = data.results.slice(0, 18);


      },
      (error) => {
        console.error('Error fetching popular series', error);
      }
    );
  }
}
