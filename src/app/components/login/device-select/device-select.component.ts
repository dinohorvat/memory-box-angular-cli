import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-device-select',
  templateUrl: './device-select.component.html',
  styleUrls: ['./device-select.component.scss']
})

export class DeviceSelectComponent implements OnInit {

  available_devices: any = [];

  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    this.getDeviceList();
  }

  getDeviceList() {
    this.globalService.getDeviceList().subscribe((res) => {
      this.available_devices = res;
    });
  }

  setActiveDevice(usb) {
    this.globalService.setActiveDevice(usb).subscribe((res: any) => {
      this.globalService.mediaFileTree = res;
      this.router.navigate(['/main/media']);
      console.log(res);
    });
  }
}
