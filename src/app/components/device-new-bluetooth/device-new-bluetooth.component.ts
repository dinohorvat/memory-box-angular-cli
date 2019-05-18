import {Component, OnInit} from '@angular/core';

declare var bluetoothSerial;
@Component({
  selector: 'app-device-new-bluetooth',
  templateUrl: './device-new-bluetooth.component.html',
  styleUrls: ['./device-new-bluetooth.component.scss']
})

export class DeviceNewBluetoothComponent implements OnInit {

  ngOnInit(): void {
    console.log('INIT');
    bluetoothSerial.list(
      (results) => {
        console.log(JSON.stringify(results));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}
