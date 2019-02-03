import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStoreService} from '../../services/local-store.service';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  allDevs = [];
  constructor(private router: Router, private storage: LocalStoreService,
              private globalService: GlobalService, private auth: AuthService) {}
  ngOnInit(): void {
    // this.allDevs = this.storage.getAllDevices();
    this.allDevs = this.storage.getItem('devices');
    console.log(this.allDevs);
  }

  goToPin(device) {
    const ip = 'raspberrypi.local';
    // const tempIp = '10.0.0.97';

    this.auth.current_pi_ip = ip;
    this.auth.current_mac = device.mac;
    this.auth.node_url_1 = 'http://' + ip + ':3000';
    this.auth.vlc_url = 'http://' + ip + ':8080';
    this.auth.media_server = 'http://' + ip + ':5000';
    this.auth.media_url = 'http://' + ip + ':8000/';
    this.auth.piweb_url_1 = 'http://' + ip;
    this.auth.allowPinPage = true;
    this.globalService.activeDeviceName = device.deviceName;
    this.router.navigate(['/main/pin']);
  }
}
