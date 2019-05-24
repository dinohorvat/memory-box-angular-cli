import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScanModel} from '../../models/scan.model';
import {LocalStoreService} from '../../services/local-store.service';
import {Router} from '@angular/router';

declare var bluetoothSerial;
@Component({
  selector: 'app-device-new-bluetooth',
  templateUrl: './device-new-bluetooth.component.html',
  styleUrls: ['./device-new-bluetooth.component.scss']
})

export class DeviceNewBluetoothComponent implements OnInit, OnDestroy {

  devices = [];
  status = '';
  availableDevices: ScanModel[] = [];
  pairedDevices: ScanModel[] = [];
  activeDevice;

  constructor(private storage: LocalStoreService, private router: Router) {}
  ngOnInit(): void {
    this.scanForPaired();
    this.subscribeRawData();
  }

  ngOnDestroy(): void {
    bluetoothSerial.disconnect(
      () => {
        bluetoothSerial.unsubscribe(
          () => {
          }
        );
      }
    );
  }

  scanForPaired() {
    bluetoothSerial.list(
      (results) => {
        this.availableDevices = results;
        this.pairedDevices = results;
        console.log(JSON.stringify(results));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  subscribeRawData() {
    bluetoothSerial.subscribeRawData((data) => {
      const enc = new TextDecoder('utf-8');
      const ip = enc.decode(data);
      console.log('responsereal', ip);
      this.storage.addDevice(this.activeDevice.address);
      const deviceInfo = {
        ip: ip,
        mac: this.activeDevice.address,
        deviceName: this.activeDevice.name
      };
      const devices = [];
      if (!devices.find((item) => item.mac === deviceInfo.mac)) {
        devices.push(deviceInfo);
      }
      this.storage.setItem('devices', JSON.stringify(devices));
      alert('Device Connected! You can go back to main screen and start using the Memory Box');
    });
  }

  connectDevice(device) {
    console.log(device);
    this.activeDevice = device;
    bluetoothSerial.connect(
      device.address,
      this.getDeviceIP(),
      (error) => {
        console.log('failed connectiong');
        console.log(error);
        alert(error);
      }
    );
  }

  getDeviceIP() {
    bluetoothSerial.write('123', (res) => {
      console.log('written', res);
    });
  }

}
