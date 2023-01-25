import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {
  private token = '';

  constructor(private storage: StorageService) {}

  async getToken(): Promise<string> {
    const token = await this.storage.get('Token');
    return (this.token = `${token}`);
  }

  normalHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return headers;
  }

  tokenHeaders() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return headers;
  }

  returnToken() {
    return this.token;
  }
}
