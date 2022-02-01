import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Actor } from 'src/app/shared/models/actor.model';
import { Company } from 'src/app/shared/models/company.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { ActorsService } from 'src/app/shared/services/actors.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { MoviesSerive } from 'src/app/shared/services/movies.service';
import { Router } from '@angular/router';
import { LoaderState } from 'src/app/shared/models/loader-state.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  public movie: Movie;
  public movieActors: Actor[];
  public movieCompany: Company;
  public id: number;
  public durationFormated: string;
  public movieDetailState: LoaderState = LoaderState.loading;
  public actorsDetailState: LoaderState = LoaderState.loading;
  public companyDetailState: LoaderState = LoaderState.loading;

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesSerive,
    private actorsService: ActorsService,
    private companiesService: CompaniesService,
    public alertController: AlertController,
    private router2: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.id = +this.router.snapshot.paramMap.get('id');
    this.getMovie(this.id);
  }

  getMovie(id: number): void {
    this.movieDetailState = LoaderState.loading;
    this.moviesService.getMovie(id).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.getActors();
        this.getCompanies();
        this.durationFormated = this.formatDuration(this.movie.duration);
        this.movieDetailState = LoaderState.loaded;
      },
      (error) => {
        console.log('error', error);
        this.movieDetailState = LoaderState.error;
      }
    );
  }

  formatDuration(a: number): string {
    const h = Math.trunc(a / 60);
    let m = (a % 60).toString();
    if (+m < 10) {
      m = `0${m}`;
    }
    return `${h}h ${m}m`;
  }

  getActors(): void {
    this.actorsDetailState = LoaderState.loading;
    this.actorsService.getActors().subscribe(
      (actor: Actor[]) => {
        this.movieActors = actor.filter((_actor) =>
          this.movie.actors.includes(_actor.id)
        );
        this.actorsDetailState = LoaderState.loaded;
      },
      (error) => {
        console.log('error', error);
        this.actorsDetailState = LoaderState.error;
      }
    );
  }

  getCompanies(): void {
    this.companyDetailState = LoaderState.loading;
    this.companiesService.getCompanies().subscribe(
      (company: Company[]) => {
        this.movieCompany = company.find((_company) =>
          _company.movies.includes(this.movie.id)
        );
        this.companyDetailState = LoaderState.loaded;
      },
      (error) => {
        console.log('error', error);
        this.companyDetailState = LoaderState.error;
      }
    );
  }

  deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id).subscribe(
      () => {
        //Eliminamos el id de la antigua
        const index = this.movieCompany.movies.indexOf(+id);
        this.movieCompany.movies.splice(index, 1);
        this.companiesService
          .deleteMovieOfCompany(this.movieCompany)
          .subscribe();
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({

      header: 'ATENCIÓN!',
      message: `Se va a eliminar '${this.movie.title}'`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteMovie(this.movie.id);
            this.router2.navigateByUrl('/movies');
          },
        },
      ],
    });
    await alert.present();
  }

  toSpanish(leng){
    this.translate.use(leng);
  }
  toEnglish(leng){
    this.translate.use(leng);
  }
}
