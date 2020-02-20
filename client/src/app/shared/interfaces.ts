
export interface Movie{
  id?: String,
  name?: String,
  genre?: String,
  directorId?: String | Director
}

export interface Director{
  id: String,
  name: String,
  age: String,
  movies?: Array<Movie>
}