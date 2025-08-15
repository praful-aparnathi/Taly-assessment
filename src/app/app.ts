// src/app/app.component.ts
import { Component, ChangeDetectorRef, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppTranslateService } from './common/services/translate-services';
import { SharedsignalServices } from './common/services/sharedsignal-services';
import { ChoosePaymentsPlanComponents } from './choose-payments-plan/choose-payments-plan-components/choose-payments-plan-components';
import { Header } from './common/components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, ChoosePaymentsPlanComponents, Header],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit, OnDestroy {
  transferSignal = inject(SharedsignalServices);

  currentLang: string = 'en';
  private langSub?: Subscription;
  textDirection: any = 'ltr'

  constructor() {
    effect(() => {
      this.textDirection = this.transferSignal.textDirection();
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }


}
