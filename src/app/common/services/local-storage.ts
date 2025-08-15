

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  constructor() {}

  // Save data to local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Retrieve data from local storage
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }

  // Remove data from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all data from local storage
  clear(): void {
    localStorage.clear();
  }
}
