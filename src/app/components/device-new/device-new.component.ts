import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {LocalStoreService} from '../../services/local-store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.scss']
})

export class DeviceNewComponent implements OnInit {

  wifiStatus: string;
  mySerial = 'b8-27-eb-9c-00-ad';
  myWifiPass = 'A3JVQbE9';
  mySSID = 'MIWIFI_5G_hSAx';
  deviceIp = '192.168.1.132';
  devices = [
    {ssid: 'MIWIFI_2G_hSAx'},
    {ssid: 'MIWIFI_5G_hSAx'},
  ];
  constructor(private globalService: GlobalService, private storage: LocalStoreService,
              private router: Router) {}
  ngOnInit(): void {

  }

  applyWifiSettings() {
    this.wifiStatus = 'Connecting...';
      const wifiInfo = {
        ssid: this.mySSID,
        password: this.myWifiPass
      };
      this.globalService.connectWifi(wifiInfo).subscribe((res_: any) => {
        this.wifiStatus = 'Applied IP : adding device ' + res_.ip;
        // Add Device
        this.storage.addDevice(res_.mac);
        // Set Device Ip to local storage
        this.storage.setItem(res_.mac, res_.ip);
        this.storage.setItem('deviceName', 'SmartPlay Device');
        this.storage.getAllDevices();

        this.router.navigate(['/main/login']);
      });
      // this.globalService.setUpWifiPhp(params).subscribe((response: any) => {
      //   this.wifiStatus = 'Response ' + response;
      //   console.log(response);
      //   if (response === 'noip' || response.indexOf('=0.0.0.0=') !== -1) {
      //     this.wifiStatus = 'Waiting for wifi connection from memorybox.Try again in a minute.';
      //     return;
      //   }
      //
      //   if (this.ValidateIPaddress(response) === true) {
      //     this.wifiStatus = 'Applied IP : adding device ' + response;
      //     // Add Device
      //     this.storage.addDevice(this.mySerial);
      //     // Set Device Ip to local storage
      //     this.storage.setItem(this.mySerial, response);
      //     this.storage.getAllDevices();
      //
      //     this.router.navigate(['/main/login']);
      //   } else {
      //     this.wifiStatus = 'Invalid IP address,please wait for Memory Box to update IP';
      //   }
      //
      //   if ( response.indexOf('=0.0.0.0=') !== -1) {
      //     this.wifiStatus = 'Waiting for device connection, Apply Settings again in a minute.';
      //   }
      // });
  }

  public ValidateIPaddress(ipaddress) {
    ipaddress = ipaddress.trim();
    if (ipaddress.indexOf('.') !== -1) {
      return true;
    }
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true);
    }
    alert(ipaddress + 'You have entered an invalid IP address!');
    return (false);
  }

}
