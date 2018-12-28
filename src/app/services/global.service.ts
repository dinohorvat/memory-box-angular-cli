import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {FileElement} from '../components/file-explorer/model/element';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GlobalService {
  public mediaFileTree = new Map<string, FileElement>();
  public activeUSB: BehaviorSubject<Usb>;

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

  public setDeviceName(name) {
    const url = this.auth.node_url_1 + '/devices/setDeviceName/' + name;
    return this.http.post(url, {});
  }

  public setPin(newPin, oldPin) {
    const url = this.auth.node_url_1 + '/devices/changepin?new=' + newPin + '&old=' + oldPin;
    return this.http.post(url, {});
  }

  /**
   * @Media API Calls
   */
  public createAlbum(albumName, selectedFiles) {
    const url = this.auth.node_url_1 + '/albums/createAlbum/' + albumName;
    return this.http.post(url, selectedFiles);
  }

  public getMedia() {
    const url = this.auth.node_url_1 + '/media/files';
    return this.http.get(url);
  }

  public getAlbums() {
    const url = this.auth.node_url_1 + '/albums';
    return this.http.get(url);
  }

  public deleteAlbum(name) {
    const url = this.auth.node_url_1 + '/albums/deleteAlbum?name=' + name;
    return this.http.post(url, {});
  }

  public downloadMedia(file) {
    const url = this.auth.node_url_1 + '/media/download';
    return this.http.post(url, file, {responseType: 'blob', observe: 'response'});
  }

  public uploadMedia(file) {
    console.log(file);
    const formData = new FormData();
    formData.append('mediaFile', file);
    const url = this.auth.node_url_1 + '/media/upload';
    return this.http.post(url, formData);
  }

  public deleteFiles(selectedFiles) {
    const url = this.auth.node_url_1 + '/media/delete';
    return this.http.post(url, selectedFiles);
  }
}

export interface Usb {
  description: string;
  size: string;
  free: string;
}
