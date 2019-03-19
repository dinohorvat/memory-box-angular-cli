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

  connectDevice(device) {
    alert('Finalizing this part tomorrow!');
  }

  writeData() {
    bluetoothSerial.write('hello, world', (success) => {
      console.log('success', success);
    }, (fail) => {
      console.log('fail', fail);
    });
  }
}
