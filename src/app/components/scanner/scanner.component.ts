import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})

export class ScannerComponent implements OnInit {

  scanStatus = 'WAITING';
  availableDevices = [];
  ngOnInit(): void {
  }

  scan() {
    this.scanStatus = 'SCANNING';
    setTimeout( () => {
      this.scanStatus = 'DONE';
      this.availableDevices.push({name: 'MemoryBox', mac: 'A3-GH-KL-12-KG-34'});
    }, 5000 );

  }
}
