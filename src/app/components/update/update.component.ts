import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {

  updateStatus = 'WAITING';
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {

  }

  downloadMedia() {
    this.updateStatus = 'UPDATING';
      this.globalService.updateDevice().subscribe((res_: any) => {
        if (res_.updated) {
          alert('Your device is updated.');
          this.updateStatus = 'DONE';
        } else {
          alert('Your device is up to date.');
        }
        this.updateStatus = 'DONE';
      });
  }
}
