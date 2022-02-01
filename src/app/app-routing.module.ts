import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'movie-detail',
    loadChildren: () => import('./pages/movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  },
  {
    path: 'movie-new-or-edit',
    loadChildren: () => import('./pages/movie-new-or-edit/movie-new-or-edit.module').then( m => m.MovieNewOrEditPageModule)
  },
  {
    path: 'movie-new-or-edit/:id',
    loadChildren: () => import('./pages/movie-new-or-edit/movie-new-or-edit.module').then( m => m.MovieNewOrEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
