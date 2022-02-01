import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie.model';
import { MoviesSerive } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorsService } from 'src/app/shared/services/actors.service';
import { Actor } from 'src/app/shared/models/actor.model';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Company } from 'src/app/shared/models/company.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderState } from 'src/app/shared/models/loader-state.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-new-or-edit',
  templateUrl: './movie-new-or-edit.page.html',
  styleUrls: ['./movie-new-or-edit.page.scss'],
})
export class MovieNewOrEditPage implements OnInit {
  public movieId: number;
  public movie: Movie;
  public genres: string[] = [];
  public actors: Actor[] = [];
  public companies: Company[] = [];
  public form: FormGroup;
  public movieEditState: LoaderState = LoaderState.loading;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesSerive,
    private actorsService: ActorsService,
    private companiesService: CompaniesService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router2: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      poster: [''],
      genre: [''],
      actors: ['', Validators.required],
      company: ['', Validators.required],
      year: ['', [Validators.required, Validators.maxLength(4)]],
      duration: ['', Validators.required],
      imdbRating: ['', [Validators.required, Validators.max(10)]],
    });

    this.movieId = this.route.snapshot.params.id;
    if (this.movieId) {
      this.getMovie(this.movieId);
    }else{
      this.movieEditState = LoaderState.loaded;
    }
    this.getGenres();
    this.getActors();
    this.getCompanies();
  }

  //Carga de películas
  getMovie(id: number): void {
    this.movieEditState = LoaderState.loading;
    this.moviesService.getMovie(id).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.form.patchValue(this.movie);
        this.movieEditState = LoaderState.loaded;
      },
      (error) => {
        console.log('error', error);
        this.movieEditState = LoaderState.error;
      }
    );
  }

  //Carga de generos
  getGenres(): void {
    this.moviesService.getMovies().subscribe(
      (movie: Movie[]) => {
        movie.map((_movie) =>
          _movie.genre.forEach((genre) => {
            if (!this.genres.includes(genre)) {
              this.genres.push(genre);
            }
          })
        );
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  //Carga de Actores
  getActors(): void {
    this.actorsService.getActors().subscribe(
      (actor: Actor[]) => {
        this.actors = actor;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  //Carga de Empresas
  getCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      (company: Company[]) => {
        this.companies = company;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  updateOrCreateMovie(): void {
    //Se comprueba Formulario
    if (this.form.valid) {
      //Se comprueba si es edición o creación
      if (this.movie) {
        const newMovie = { id: this.movieId, ...this.form.value };
        delete newMovie.company;
        newMovie.actors = newMovie.actors.map(
          (actor) => (actor = Number(actor))
        );
        this.moviesService.updateMovie(newMovie).subscribe(
          () => {
            const addMovieToCompany = this.companies.find(
              (company) => company.name === this.form.value.company
            );
            const currentCompany = this.companies.find((_company) =>
              _company.movies.includes(this.movie.id)
            );
            //Eliminamos el id de la antigua
            const index = currentCompany.movies.indexOf(+this.movieId);
            currentCompany.movies.splice(index, 1);
            this.companiesService
              .deleteMovieOfCompany(currentCompany)
              .subscribe();
            //Añadimos el id a la nueva
            addMovieToCompany.movies.push(+this.movieId);
            this.companiesService
              .addMovieToCompany(addMovieToCompany)
              .subscribe();
            this.editedMovie();
            this.router2.navigateByUrl(`/movies/${+this.movieId}`);
          },
          (error) => {
            console.log('error', error);
          }
        );
      } else {
        const newMovie = { ...this.form.value };

        delete newMovie.company;
        newMovie.actors = newMovie.actors.map(
          (actor) => (actor = Number(actor))
        );
        this.moviesService.addMovie(newMovie).subscribe(
          () => {
            const addMovieToCompany = this.companies.find(
              (company) => company.name === this.form.value.company
            );
            addMovieToCompany.movies.push(this.moviesService.lastAddId);
            this.companiesService
              .addMovieToCompany(addMovieToCompany)
              .subscribe();
            this.addedMovie();
            this.router2.navigateByUrl(
              `/movies/${this.moviesService.lastAddId}`
            );
          },
          (error) => {
            console.log('error', error);
          }
        );
      }
    } else {
      this.invalidForm();
    }
  }

  //Toast añadir película
  async addedMovie() {
    const toast = await this.toastController.create({
      message: 'Se ha añadido la película',
      duration: 2000,
    });
    toast.present();
  }

  //Toast editar película
  async editedMovie() {
    const toast = await this.toastController.create({
      message: 'Película modificada con exito',
      duration: 2000,
    });
    toast.present();
  }

  //Toast error formulario
  async invalidForm() {
    const toast = await this.toastController.create({
      message: 'Por favor, revise los campos del formulario',
      duration: 2000,
    });
    toast.present();
  }

  toSpanish(leng){
    this.translate.use(leng);
  }
  toEnglish(leng){
    this.translate.use(leng);
  }
}
