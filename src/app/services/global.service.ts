import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class GlobalService {
  constructor(public http: HttpClient, public auth: AuthService) {}

  public getDeviceList() {
    const url = this.auth.url + 'devices';
    return this.http.post(url, {});
  }
}
