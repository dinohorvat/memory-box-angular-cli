import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {Router} from '@angular/router';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-backup-media',
  templateUrl: './backup-media.component.html',
  styleUrls: ['./backup-media.component.scss']
})

export class BackupMediaComponent implements OnInit {

  available_devices: any = [];
  backupDesc;
  backupSrc;
  available = false;
  constructor(private globalService: GlobalService, private router: Router,
              private fileService: FileService) {}

  ngOnInit(): void {
    this.getDeviceList();
  }

  getDeviceList() {
    this.globalService.getDeviceList().subscribe((res) => {
      this.available_devices = res;
      if (this.available_devices.length > 1) {
        this.backupSrc = this.available_devices[0].diskPath;
        this.backupDesc = this.available_devices[1].diskPath;
        this.available = true;
      } else {
        this.available = false;
      }
    });
  }

}
