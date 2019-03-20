import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ScanModel} from '../../models/scan.model';
import {isNullOrUndefined} from 'util';

declare var bluetoothSerial;
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})

export class ScannerComponent implements OnInit {

  scanStatus = 'WAITING';
  availableDevices: ScanModel[] = [];
  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.subscribeForData();
  }

  scan() {
    this.scanStatus = 'SCANNING';
    this.availableDevices = [];
    this.ref.detectChanges();
    this.ref.markForCheck();
    bluetoothSerial.discoverUnpaired((res) => {
      console.log(res);
      const _res = res.filter((item) => !isNullOrUndefined(item.name));
      this.availableDevices = _res.filter((item) => item.name.includes('raspberrypi'));
      this.availableDevices = this.availableDevices.filter((el, i, a) => i === a.indexOf(el));
      this.scanStatus = 'DONE';
      this.ref.detectChanges();
      this.ref.markForCheck();
    }, function(err) {
      console.log(err);
    });
  }

  connectDevice(device: ScanModel) {
    bluetoothSerial.connectInsecure(device.address, (connectSuccess) => {
      console.log('success', connectSuccess);
    }, (connectFailure) => {
      console.log('fail', connectFailure);
    });

  }

  discoverPaired() {
    bluetoothSerial.list((devices) => {
      devices.forEach((device) => {
        console.log(device.id);
      });
    }, (fail) => {
      console.log('fail', fail);
    });
  }

  writeData() {
    bluetoothSerial.write('hello, world', (success) => {
      console.log('success', success);
    }, (fail) => {
      console.log('fail', fail);
    });
  }

  subscribeForData() {
    // the success callback is called whenever data is received
    bluetoothSerial.subscribeRawData((data) => {
      console.log(data);
      const bytes = new Uint8Array(data);
      console.log(bytes);
    }, (fail) => {
      console.log(fail);
    });
  }
}
