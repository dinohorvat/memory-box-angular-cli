import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {LocalStoreService} from '../../services/local-store.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-device-setup',
  templateUrl: './device-setup.component.html',
  styleUrls: ['./device-setup.component.scss']
})

export class DeviceSetupComponent implements OnInit {

  newPin;
  oldPin;
  deviceName;
  activeDeviceName;
  constructor(private globalService: GlobalService, private storage: LocalStoreService,
              private auth: AuthService) {}
  ngOnInit(): void {
    this.activeDeviceName = this.globalService.activeDeviceName;
  }

  savePin() {
    if (this.oldPin === '') {
      alert('Enter a device name');
      return false;
    }

    if (this.newPin === '') {
      alert('Enter a device name');
      return false;
    }
    if (this.newPin.length < 4) {
      alert('Make sure that PIN contains at least 4 characters');
      return false;
    }
    this.globalService.setPin(this.newPin, this.oldPin).subscribe((res: any) => {
      if (res.success) {
        alert('PIN Changed!');
      } else {
        alert('Current PIN is wrong');
      }
    });
  }

  saveDeviceName() {
    const devices = this.storage.getItem('devices');
    for (const device of devices) {
      if (device.deviceName === this.activeDeviceName ) {
        device.deviceName = this.deviceName;
      }
    }
    this.storage.setItem('devices', JSON.stringify(devices));
    alert('Device Name Changed!');
  }
}
