import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  constructor (public globalService: GlobalService) {}
  ngOnInit(): void {

  }
}
