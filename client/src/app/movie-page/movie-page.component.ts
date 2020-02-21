import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/interfaces';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  movies: Movie[] = []
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAll().subscribe(data => {
      this.movies = data
      console.log(this.movies)
    })
  }

}
