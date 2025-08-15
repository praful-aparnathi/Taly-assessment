import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { SharedsignalServices } from '../../services/sharedsignal-services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../services/translate-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  toggleCurrentLanguage = false;
  textDirection: any = 'ltr'
  currentLang: string = 'en';
  private langSub?: Subscription;
  transferSignal = inject(SharedsignalServices);
  constructor(
    public translationService: TranslateService,
    private appTranslate: AppTranslateService,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
       this.langSub = this.appTranslate.language$.subscribe(lang => {
      this.currentLang = lang;
      this.textDirection = lang === 'ar' ? 'rtl' : 'ltr';
      this.transferSignal.setTextDirection(this.textDirection);
      document.documentElement.setAttribute('dir', this.textDirection);
      this.cdr.detectChanges();
    });
    });
  }
  ngOnInit() {
   
  }
  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
  async changeLanguage(lang: string) {
    await this.appTranslate.switchLanguage(lang);
  }
  async toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    await this.changeLanguage(newLang);
    this.textDirection = newLang === 'ar' ? 'rtl' : 'ltr';
    this.transferSignal.setTextDirection(this.textDirection);
    this.cdr.detectChanges();
  }

}
