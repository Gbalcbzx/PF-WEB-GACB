import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  searchResults: any[] = [];
  searchQuery: string = '';

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results;
    });
  }

  searchMovies(query: string): void {
    this.searchQuery = query;
    if (query) {
      this.moviesService.searchMovies(query).subscribe((data: any) => {
        this.searchResults = data.results;
      });
    } else {
      this.searchResults = [];
    }
  }

  viewMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}


