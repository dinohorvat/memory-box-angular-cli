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
    this.globalService.next();
  }

  prevMedia() {
    this.globalService.prev();
  }
  playMedia() {
    this.globalService.play();
  }

  pauseMedia() {
    this.globalService.pause();
  }

  stopMedia() {
    this.globalService.stop();
  }
}
