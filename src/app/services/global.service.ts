import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class GlobalService {
  autowifi_url = 'http://67.227.156.25/memorybox/write.php';

  constructor(public http: HttpClient, public auth: AuthService) {}

  public setUpWifi(params) {
    const url = this.autowifi_url + '?' + params;
    return this.http.post(url, {}, {responseType: 'text'});
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
