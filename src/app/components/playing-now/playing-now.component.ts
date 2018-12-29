import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-playing-now',
  templateUrl: './playing-now.component.html',
  styleUrls: ['./playing-now.component.scss']
})

export class PlayingNowComponent implements OnInit {

  constructor(public globalService: GlobalService) {}
  ngOnInit(): void {

  }

  nextMedia() {
    this.globalService.nextMedia().subscribe((res) => {
      console.log(res);
    });
  }

  prevMedia() {
    this.globalService.prevMedia().subscribe((res) => {
      console.log(res);
    });
  }
  playMedia() {
    this.globalService.play().subscribe((res) => {
      console.log(res);
    });
  }

  pauseMedia() {
    this.globalService.pauseMedia().subscribe((res) => {
      console.log(res);
    });
  }

  stopMedia() {
    this.globalService.stopMedia().subscribe((res) => {
      console.log(res);
    });
  }
}
