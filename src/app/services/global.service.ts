import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {FileElement} from '../components/file-explorer/model/element';
import {BehaviorSubject, Subject} from 'rxjs';
import {isNullOrUndefined} from 'util';

@Injectable()
export class GlobalService {
  public mediaFileTree = new Map<string, FileElement>();
  public activeUSB: BehaviorSubject<Usb>;
  public activeDeviceName = '';
  blockUi = new Subject<boolean>();
  public blockUiText = 'Loading';
  public activePlayList = [];

  pilocalIP = new Subject();

  constructor(public http: HttpClient, public auth: AuthService) {
  }

  /**
   * @Authentication API Calls
   */

  // Python build AutoWifi.py
  // public setUpWifiPython(ip) {
  //   const url = 'http://' + ip + ':3000/wifi';
  //   return this.http.get(url );
  // }

  set piLocal(value) {
    this.pilocalIP.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('piLocalIp', value);
  }

  get piLocal() {
    return localStorage.getItem('piLocalIp');
  }

  // Call to external php script
  public setUpWifiPhp(params) {
    const url = this.auth.autowifi_url + '?' + params;
    return this.http.post(url, {}, {responseType: 'text'});
  }

  public connectWifi(data) {
    const url =  'http://raspberrypi.local:3000/connectWifi';
    return this.http.post(url, data);
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

  public updateDevice() {
    const url = this.auth.node_url_1 + '/updateApp';
    return this.http.get(url);
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

  public playMedia(duration) {
    const url = this.auth.media_server + '/play';
    return this.http.post(url, {duration: duration, mediaFiles: this.activePlayList});
  }

  public nextMedia() {
    const url = this.auth.media_server + '/next';
    return this.http.get(url);
  }

  public prevMedia() {
    const url = this.auth.media_server + '/previous';
    return this.http.get(url);
  }

  public play() {
    const url = this.auth.media_server + '/continue';
    return this.http.get(url);
  }

  public pauseMedia() {
    const url = this.auth.media_server + '/pause';
    return this.http.get(url);
  }

  public stopMedia() {
    const url = this.auth.media_server + '/stop';
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

  public downloadAllMedia(mediaList) {
    const url = this.auth.node_url_1 + '/media/downloadAll';
    return this.http.post(url, mediaList, {responseType: 'blob', observe: 'response'});
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

  public renameFile(file) {
    const url = this.auth.node_url_1 + '/media/rename';
    return this.http.post(url, file);
  }

  public blockUserInterface(text) {
    this.blockUiText = text;
    this.blockUi.next(true);
  }

  public unblockUserInterface() {
    this.blockUi.next(false);
  }
}

export interface Usb {
  description: string;
  size: string;
  free: string;
}
