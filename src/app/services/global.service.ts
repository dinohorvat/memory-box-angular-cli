import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class GlobalService {
  constructor(public http: HttpClient, public auth: AuthService) {}

  public setUpWifi() {
    const url = this.auth.url + 'wifi';
    return this.http.get(url, {responseType: 'text'});
  }

  public connectToPi(data) {
    const url = this.auth.url + 'connect';
    return this.http.post(url, data);
  }

  public getDeviceList() {
    const url = this.auth.url + 'devices';
    return this.http.post(url, {});
  }
}
