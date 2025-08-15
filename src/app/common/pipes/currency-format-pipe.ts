


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: string = 'KD'): string {
    return `${currency} ${value.toFixed(3)}`;
  }
}
