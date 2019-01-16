import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  blockUi;
  constructor (public globalService: GlobalService, private ref: ChangeDetectorRef) {
    this.globalService.blockUi.subscribe((res) => {
      this.blockUi = res;
      ref.markForCheck();
      ref.detectChanges();
    });
  }
  ngOnInit(): void {

  }
}
