import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieResult } from '../../interface/movie-result.interface';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  searchResults$: Observable<MovieResult[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.moviesService.searchMovies(term))
    );
  }

  onSearch(event: any) {
    const searchTerm = (event.target as HTMLInputElement).value.trim();
    this.searchTerms.next(searchTerm);
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
    // Limpia la búsqueda después de navegar
    this.searchTerms.next('');
  }
}
