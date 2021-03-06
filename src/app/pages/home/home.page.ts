import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  public lenguage = 'en';
  constructor(private translate: TranslateService) {
  }

  ngOnInit() {

  }

  toSpanish(leng){
    this.translate.use(leng);
  }
  toEnglish(leng){
    this.translate.use(leng);
  }
}
