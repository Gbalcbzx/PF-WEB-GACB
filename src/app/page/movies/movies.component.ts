import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { SeriesComponent } from '../series/series.component';
import { MayusculasPipe } from "../../pipe/mayusculas.pipe";


@Component({
    selector: 'app-movies',
    standalone: true,
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css',
    imports: [CommonModule, SeriesComponent, MayusculasPipe, RouterLink]
})
export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  topRatedMovies: any[] = [];
  upcomingMovies: any[] = [];
  trendingMovies: any[] = [];
  latestMovie: any;
  carouselImage: string = ''; // Nuevo campo para la imagen del carousel

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getPopularMovies().subscribe(data => {
      this.popularMovies = data.results.slice(0, 6);
      // Establecer la imagen del carousel
      if (this.popularMovies.length > 0) {
        this.carouselImage = 'https://image.tmdb.org/t/p/original/' + this.popularMovies[1].backdrop_path;
      }
    });

    this.moviesService.getNowPlayingMovies().subscribe(data => {
      this.nowPlayingMovies = data.results.slice(0, 6);
    });

    this.moviesService.getTopRatedMovies().subscribe(data => {
      this.topRatedMovies = data.results.slice(0, 12);
    });

    this.moviesService.getUpcomingMovies().subscribe(data => {
      this.upcomingMovies = data.results.slice(0, 6);
    });

    this.moviesService.getTrendingMovies().subscribe(data => {
      this.trendingMovies = data.results.slice(0, 12);
    });

    this.moviesService.getLatestMovie().subscribe(data => {
      this.latestMovie = data;
    });
  }
}
