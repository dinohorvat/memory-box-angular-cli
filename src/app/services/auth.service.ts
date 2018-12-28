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
  allowPinPage = false;

  current_pi_ip;
  current_mac;
  node_url_1;
  piweb_url_1;
  autowifi_url = 'http://67.227.156.25/memorybox/write.php';
  constructor(
    private store: LocalStoreService,
    private router: Router
  ) {
    this.checkAuth();
  }

  checkAuth() {
    this.authenticated = this.store.getItem(this.current_mac);
  }
}
