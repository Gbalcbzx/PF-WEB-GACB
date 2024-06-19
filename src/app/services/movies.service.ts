// src/app/services/movies.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MovieResult } from '../interface/movie-result.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = '0fff76a5ba1fceb7cf615a181f25ce6f';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getNowPlayingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`);
  }

  getUpcomingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`);
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }

  getLatestMovie(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/latest?api_key=${this.apiKey}`);
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?with_genres=${genreId}&api_key=${this.apiKey}`);
  }


  searchMovies(query: string): Observable<MovieResult[]> {
    return this.http.get(`${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`)
      .pipe(
        map((response: any) => response.results as MovieResult[]) // Ajustar según la estructura de la respuesta de la API
      );
  }


  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
  getPopularSeries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}`);
  }
  getMovieTrailers(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`);
  }

  getTvShowTrailers(tvShowId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${tvShowId}/videos?api_key=${this.apiKey}`);
  }
}
