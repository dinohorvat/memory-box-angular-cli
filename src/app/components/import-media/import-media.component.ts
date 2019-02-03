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
    this.uploadStatus = 'UPLOADING';
    this.blockUpload = true;
    const filesLength = event.target.files.length;
    let fileStart = 0;
    for (const file of event.target.files) {
      this.globalService.uploadMedia(file).subscribe((res) => {
        fileStart++;
        if (fileStart === filesLength) {
          this.uploadStatus = 'DONE';
        }
      });
    }
  }

  uploadAnother() {
    this.blockUpload = false;
    this.uploadStatus = 'WAITING';
  }
}
