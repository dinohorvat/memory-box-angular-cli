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

  constructor(private globalService: GlobalService, private storage: LocalStoreService,
              private auth: AuthService) {}
  ngOnInit(): void {

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
    this.globalService.setDeviceName(this.deviceName).subscribe((res: any) => {
      if (res.success) {
        this.storage.setItem(this.auth.current_mac, this.deviceName);
        alert('Device Name Changed!');
      }
    });
  }
}
