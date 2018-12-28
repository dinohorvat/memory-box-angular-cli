import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class GlobalService {

  constructor(public http: HttpClient, public auth: AuthService) {}

  public setUpWifi(params) {
    const url = this.auth.autowifi_url + '?' + params;
    return this.http.post(url, {}, {responseType: 'text'});
  }

  public authenticateWithPin(pin) {
    const url = this.auth.node_url_1 + '/connect/' + pin;
    console.log(url);
    return this.http.post(url, {}, {responseType: 'text'});
  }

  public connectToPi(data) {
    const url = this.auth.node_url_1 + '/connect';
    return this.http.post(url, data);
  }

  public getDeviceList() {
    const url = this.auth.node_url_1 + '/devices';
    return this.http.post(url, {});
  }
}
