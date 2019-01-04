import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-export-media',
  templateUrl: './export-media.component.html',
  styleUrls: ['./export-media.component.scss']
})

export class ExportMediaComponent implements OnInit {

  uploadStatus = 'WAITING';
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {

  }

  downloadMedia() {
    this.uploadStatus = 'ZIPPING';
    this.globalService.getMedia().subscribe((res) => {
      const media = res;
      console.log(media);
      const data = {
        media: media
      };
      this.globalService.downloadAllMedia(data).subscribe((res_: any) => {
        this.uploadStatus = 'WAITING';
        const content = res_.body;
        const fileName = res_.headers.get('content-filename');
        saveAs(content, fileName);
      });
    });
  }
}
