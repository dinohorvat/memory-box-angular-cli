import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {FileElement} from '../components/file-explorer/model/element';
import {BehaviorSubject} from 'rxjs';
import {isNullOrUndefined} from 'util';

@Injectable()
export class GlobalService {
  public mediaFileTree = new Map<string, FileElement>();
  public activeUSB: BehaviorSubject<Usb>;

  public activePlayList = [];

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

  public getMedia(data?) {
    if (isNullOrUndefined(data)) {
      data = {specific: false};
    }
    const url = this.auth.node_url_1 + '/media/files';
    return this.http.post(url, data);
  }

  public playMedia() {
    const url = this.auth.node_url_1 + '/playlist';
    return this.http.post(url, this.activePlayList);
  }

  public nextMedia() {
    const url = this.auth.node_url_1 + '/playlist/next';
    return this.http.get(url);
  }

  public prevMedia() {
    const url = this.auth.node_url_1 + '/playlist/prev';
    return this.http.get(url);
  }

  public play() {
    const url = this.auth.node_url_1 + '/playlist/play';
    return this.http.get(url);
  }

  public pauseMedia() {
    const url = this.auth.node_url_1 + '/playlist/pause';
    return this.http.get(url);
  }

  public stopMedia() {
    const url = this.auth.node_url_1 + '/playlist/stop';
    return this.http.get(url);
  }

  public createTemporaryPlaylist(selectedFiles) {
    const url = this.auth.node_url_1 + '/playlist/createTemp';
    return this.http.post(url, selectedFiles);
  }

  public getAlbums() {
    const url = this.auth.node_url_1 + '/albums';
    return this.http.get(url);
  }

  public getAlbum(name) {
    const url = this.auth.node_url_1 + '/albums/album/' + name;
    return this.http.get(url);
  }

  public createAlbum(name, selectedFiles) {
    const url = this.auth.node_url_1 + '/albums/createAlbum/' + name;
    return this.http.post(url, selectedFiles);
  }

  public deleteAlbum(name) {
    const url = this.auth.node_url_1 + '/albums/deleteAlbum?name=' + name;
    return this.http.post(url, {});
  }

  public downloadMedia(file) {
    const url = this.auth.node_url_1 + '/media/download';
    return this.http.post(url, file, {responseType: 'blob', observe: 'response'});
  }


  public backupMedia(data) {
    const url = this.auth.node_url_1 + '/media/backup';
    return this.http.post(url, data);
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
