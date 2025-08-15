// sharedsignal-services.ts (example)
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedsignalServices {
  private _textDirection = signal<'ltr' | 'rtl'>('ltr');

  textDirection = this._textDirection.asReadonly();

  setTextDirection(dir: 'ltr' | 'rtl') {
    this._textDirection.set(dir);
  }
}
