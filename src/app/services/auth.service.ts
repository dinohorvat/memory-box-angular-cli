import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {LocalStoreService} from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  port = ':31415';
  url = 'http://192.168.1.139:3000/';
  userToken = '';
  constructor(
    private store: LocalStoreService,
    private router: Router
  ) {
    this.checkAuth();
  }

  checkAuth() {
    this.authenticated = this.store.getItem('vol_user');
    this.userToken = this.store.getItem('V_USER');
  }

  signin(credentials) {
    this.authenticated = true;
    this.store.setItem('vol_user', true);
    return of({}).pipe(delay(1500));
  }
}
