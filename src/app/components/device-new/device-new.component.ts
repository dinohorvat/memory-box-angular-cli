import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.scss']
})

export class DeviceNewComponent implements OnInit {

  wifiStatus: string;

  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {

  }

  applyWifiSettings() {
    this.wifiStatus = 'Connecting...';
    this.globalService.setUpWifi().subscribe((res) => {
      this.wifiStatus = 'Connected';
      console.log(res);
    });
  }
}
