import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScanModel} from '../../models/scan.model';

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
  ngOnInit(): void {
    this.scanForPaired();
    this.subscribeRawData();
  }

  ngOnDestroy(): void {
    bluetoothSerial.disconnect(
      () => {
        bluetoothSerial.unsubscribe(
           (data) => {
            console.log('unsubscribed');
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
      console.log('responsereal', data);
    });

    bluetoothSerial.write('123', (res) => {
      console.log('written', res);
    });
  }

  connectDevice(device) {
    console.log(device);
    bluetoothSerial.connect(
      device.address,  // device to connect to
      this.subscribeRawData(),    // start listening if you succeed
      alert('Unable to reach the device')    // show the error if you fail
    );
  }
}
