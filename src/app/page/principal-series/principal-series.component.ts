import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-principal-series',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './principal-series.component.html',
  styleUrl: './principal-series.component.css'
})
export class PrincipalSeriesComponent implements OnInit {
  seriesPopulares: any[] = [];
  carouselImage: string = ''; // Campo para la imagen del carousel

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadSeriesPopulares();
  }

  loadSeriesPopulares() {
    this.moviesService.getPopularSeries().subscribe(
      (data: any) => {
        this.seriesPopulares = data.results.slice(0, 18);
        // Establecer la imagen del carousel si hay series disponibles
        if (this.seriesPopulares.length > 0) {
          this.carouselImage = 'https://image.tmdb.org/t/p/original/' + this.seriesPopulares[2].backdrop_path;
        }
      },
      (error) => {
        console.error('Error fetching popular series', error);
      }
    );
  }
}
