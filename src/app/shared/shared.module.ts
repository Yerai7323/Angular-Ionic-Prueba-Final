import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CardComponent,
    LoaderComponent
  ],
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderComponent,
    CardComponent,
    TranslateModule
  ],
})
export class SharedModule {}
