import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieNewOrEditPageRoutingModule } from './movie-new-or-edit-routing.module';

import { MovieNewOrEditPage } from './movie-new-or-edit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MovieNewOrEditPageRoutingModule
  ],
  declarations: [MovieNewOrEditPage]
})
export class MovieNewOrEditPageModule {}
