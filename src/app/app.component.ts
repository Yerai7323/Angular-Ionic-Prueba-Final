import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Movies', url: '/movies', icon: 'film' },
    { title: 'Actors', url: '/actors', icon: 'people-circle' },
    { title: 'Companies', url: '/companies', icon: 'videocam' },
  ];
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'es']);
    translate.use('en');
  }

}
