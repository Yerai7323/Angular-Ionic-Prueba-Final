import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderState } from 'src/app/shared/models/loader-state.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { MoviesSerive } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  public movies: Movie[];
  public moviesState: LoaderState = LoaderState.loading;

  constructor(
    private moviesService: MoviesSerive,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesState = LoaderState.loading;
    this.moviesService.getMovies().subscribe(
      (movie: Movie[]) => {
        this.movies = movie;
        this.moviesState = LoaderState.loaded;
      },
      (error) => {
        console.log('error', error);
        this.moviesState = LoaderState.error;
      }
    );
  }
  toSpanish(leng){
    this.translate.use(leng);
  }
  toEnglish(leng){
    this.translate.use(leng);
  }
}
