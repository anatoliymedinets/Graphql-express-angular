import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Movie, Director} from './shared/interfaces'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  movies: Movie[];
  movie: Movie;
  directors: Director[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
      this.apollo
      .watchQuery({
        query: gql`
        query ($id: ID) {
          movie(id: $id) {
            id
            name
            genre
            director {
              id
              name
            }
          }
          movies{
            name,
            genre
          }
          directors{
            id,
            name,
            age
          }
        }
        `,
        variables:{
          id: "5e4cffbc592c3741a0e9e733"
        }
      })
      .valueChanges.subscribe((result:any) => {
        console.log(result)
        const data = {...result.data}

        this.movie = data && data.movie;
        this.movies = data && data.movies;
        this.directors = data && data.directors
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
