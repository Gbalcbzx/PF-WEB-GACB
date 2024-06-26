import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MayusculasPipe } from "../../pipe/mayusculas.pipe";
import { FormsModule } from '@angular/forms';
import { SafePipe } from "../../pipe/safe.pipe";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-movie-detail',
    standalone: true,
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css',
    imports: [CommonModule, MayusculasPipe, FormsModule, SafePipe]
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  trailerUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesService.getMovieDetails(+id).subscribe(
        movie => {
          this.movie = movie;
          this.loadTrailer(+id);
        }
      );
    }
  }

  loadTrailer(movieId: number): void {
    this.moviesService.getMovieTrailers(movieId).subscribe(
      response => {
        const trailer = response.results.find((video: any) => video.type === 'Trailer');
        if (trailer) {
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      }
    );
  }

  getGenres(): string {
    return this.movie && this.movie.genres ? this.movie.genres.map((g: any) => g.name).join(', ') : '';
  }
}
