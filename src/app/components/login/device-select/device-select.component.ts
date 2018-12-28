import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {Router} from '@angular/router';
import {FileService} from '../../../services/file.service';
import {FileElement} from '../../file-explorer/model/element';

@Component({
  selector: 'app-device-select',
  templateUrl: './device-select.component.html',
  styleUrls: ['./device-select.component.scss']
})

export class DeviceSelectComponent implements OnInit {

  available_devices: any = [];

  constructor(private globalService: GlobalService, private router: Router,
              private fileService: FileService) {}

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
      // this.fileService.map = new Map<string, FileElement>();
      // for (const file of res) {
      //   this.fileService.add(file);
      // }
      this.router.navigate(['/main/media']);
      console.log(res);
    });
  }
}
