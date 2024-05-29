import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(key: string, value: any): void {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key) as string;
    return JSON.parse(value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
