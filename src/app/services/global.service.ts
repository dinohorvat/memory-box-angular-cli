import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class GlobalService {

  mediaFileTree = [];
  constructor(public http: HttpClient, public auth: AuthService) {}

  /**
   * @Authentication API Calls
   */
  public setUpWifi(params) {
    const url = this.auth.autowifi_url + '?' + params;
    return this.http.post(url, {}, {responseType: 'text'});
  }

  public authenticateWithPin(pin) {
    const url = this.auth.node_url_1 + '/connect/' + pin;
    console.log(url);
    return this.http.post(url, {});
  }

  public connectToPi(data) {
    const url = this.auth.node_url_1 + '/connect';
    return this.http.post(url, data);
  }

  /**
   * @Device API Calls
   */
  public getDeviceList() {
    const url = this.auth.node_url_1 + '/devices';
    return this.http.post(url, {});
  }

  public setActiveDevice(usb) {
    const url = this.auth.node_url_1 + '/devices/set?usb=' + usb;
    return this.http.post(url, {});
  }
}
