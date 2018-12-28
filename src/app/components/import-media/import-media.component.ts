import {Component, OnInit} from '@angular/core';
import {GlobalService, Usb} from '../../services/global.service';

@Component({
  selector: 'app-import-media',
  templateUrl: './import-media.component.html',
  styleUrls: ['./import-media.component.scss']
})

export class ImportMediaComponent implements OnInit {
  usb: Usb;
  uploadStatus = 'WAITING';   // WAITING | UPLOADING | DONE
  blockUpload = false;
  constructor(public globalService: GlobalService) {
    if (this.globalService.activeUSB) {
      this.usb = this.globalService.activeUSB.getValue();
    }
  }
  ngOnInit(): void {
  }

  uploadFile(event) {
    if (this.blockUpload) { return; }
    const file = event.target.files[0];
    this.uploadStatus = 'UPLOADING';
    this.blockUpload = true;
    this.globalService.uploadMedia(file).subscribe((res) => {
      console.log(res);
      this.uploadStatus = 'DONE';
    });
  }

  uploadAnother() {
    this.blockUpload = false;
    this.uploadStatus = 'WAITING';
  }
}
