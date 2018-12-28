import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  public allDevs = [];
  private ls = window.localStorage;
  constructor() { }

  public setItem(key, value) {
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key) {
    const value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      // console.log(e)
      return null;
    }
  }

  public clear() {
    this.ls.clear();
  }

  public addDevice(mac) {

    const dArr1 = [];

    console.log('Adding device');
    if (this.ls.getItem('dArr1') == null) {
      console.log('no previous');
      this.ls.setItem('dArr1', JSON.stringify(dArr1));
    }
    let tx;
    try {
      tx = JSON.parse(this.ls.getItem('dArr1'));


      if (tx == null) { this.ls.setItem('dArr1', JSON.stringify(dArr1)); }

      console.log('tx');
      console.log(tx);
      if (!tx.includes(mac)) { tx.push(mac); }

      this.ls.setItem('dArr1', JSON.stringify(tx));

      console.log('tx= ');
      console.log(tx);
    } catch (exc) {}

  }

  public getAllDevices() {

    const retrievedData = this.ls.getItem('dArr1');

    const getDevs = JSON.parse(retrievedData);

    const filtArr = [];

    for (const key of getDevs) {
      console.log('Key=' + key);
      console.log('Device= ' + getDevs[key]);
      console.log('if saved named = ' + this.ls.getItem( getDevs[key] + 'name' ));
      filtArr[key] = (getDevs[key]);


      if (this.ls.getItem( filtArr[key] + 'name' ) === null) {
        console.log('Name not saved before');
      } else {
        filtArr[key] = this.ls.getItem( filtArr[key] + 'name' );
      }


    }

    try {
      this.allDevs = filtArr;

      return getDevs;
    } catch (err) {}

  }

}
