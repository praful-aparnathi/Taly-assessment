// src/app/common/services/app-translate.service.ts
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppTranslateService {
  private translate = inject(TranslateService);
  private currentLanguage = 'en';
  private initialized = false;

  private languageSubject = new BehaviorSubject<string>(this.currentLanguage);
  language$ = this.languageSubject.asObservable();

  constructor() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setFallbackLang('en');

    const savedLang = localStorage.getItem('LANGUAGE') || 'en';
    this.init(savedLang);
  }

  private async init(lang: string) {
    await this.setLanguage(lang);
    this.initialized = true;
  }

  private setLanguage(lang: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.translate.use(lang).subscribe({
        next: () => {
          this.currentLanguage = lang;
          this.languageSubject.next(lang);
          localStorage.setItem('LANGUAGE', lang);
          resolve();
        },
        error: (err) => {
          console.error(`Could not load translation: ${lang}`, err);
          reject(err);
        },
      });
    });
  }

  async switchLanguage(lang: string): Promise<void> {
    if (!this.initialized) {
      await new Promise(resolve => {
        const check = () => {
          if (this.initialized) resolve(undefined);
          else setTimeout(check, 50);
        };
        check();
      });
    }

    if (lang !== this.currentLanguage) {
      await this.setLanguage(lang);
    } else {
      const fallbackLang = lang === 'en' ? 'ar' : 'en';
      await this.setLanguage(fallbackLang);
      await this.setLanguage(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }
}
