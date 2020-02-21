import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MovieService{
  constructor(private http: HttpClient){

  }

  getAll(): Observable<Movie[]>{
    return this.http.get<Movie[]>('http://localhost:5000/movie')
  }
}