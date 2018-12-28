import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-device-select',
  templateUrl: './device-select.component.html',
  styleUrls: ['./device-select.component.scss']
})

export class DeviceSelectComponent implements OnInit {

  available_devices: any = [];

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.getDeviceList();
  }

  getDeviceList() {
    this.globalService.getDeviceList().subscribe((res) => {
      this.available_devices = res;
    });
  }
}
