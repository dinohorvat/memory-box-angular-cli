import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  public allDevs = [];
  private ls = window.localStorage;
  constructor() { }

  public setItem(key, value) {
    value = JSON.stringify(value);
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

  public getAllDevices() {

    const retrievedData = localStorage.getItem('dArr1');

    const getDevs = JSON.parse(retrievedData);

    const filtArr = [];

    for (const key of getDevs) {
      console.log('Key=' + key);
      console.log('Device= ' + getDevs[key]);
      console.log('if saved named = ' + localStorage.getItem( getDevs[key] + 'name' ));
      filtArr[key] = (getDevs[key]);


      if (localStorage.getItem( filtArr[key] + 'name' ) === null) {
        console.log('Name not saved before');
      } else {
        filtArr[key] = localStorage.getItem( filtArr[key] + 'name' );
      }


    }

    try {
      this.allDevs = filtArr;

      return filtArr;
    } catch (err) {}

  }

}
