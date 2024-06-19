import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {
  popularSeries: any[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getPopularSeries();
  }

  getPopularSeries() {
    this.moviesService.getPopularSeries().subscribe(
      (data: any) => {
        this.popularSeries = data.results.slice(0, 12);
      },
      (error) => {
        console.error('Error fetching popular series:', error);
      }
    );
  }
}
