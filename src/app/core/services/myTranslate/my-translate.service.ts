import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(
    private readonly translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translateService.setDefaultLang('en')
      let savedLang = localStorage.getItem("lang")
      if(savedLang){
        translateService.use(savedLang)
      }
      this.changeDir();
    }
  }

  changeDir() {
    const lang = localStorage.getItem("lang");
    if (lang === "en") {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    } else if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    }
  }
  changeLang(lang:string){
    localStorage.setItem("lang",lang)
    this.translateService.use(lang)
    this.changeDir()
  }
}
