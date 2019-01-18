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
    this.allDevs = this.storage.getAllDevices();
    console.log(this.allDevs);
  }

  goToPin(mac) {
    const ip = localStorage.getItem(mac);
    // const tempIp = '192.168.1.132';
    const tempIp = '10.0.0.97';

    this.auth.current_pi_ip = ip;
    this.auth.current_mac = mac;
    this.auth.node_url_1 = 'http://' + tempIp + ':3000';
    this.auth.vlc_url = 'http://' + tempIp + ':8080';
    this.auth.media_server = 'http://' + tempIp + ':5000';
    this.auth.media_url = 'http://' + tempIp + ':8000/';
    this.auth.piweb_url_1 = 'http://' + tempIp;
    this.auth.allowPinPage = true;
    this.router.navigate(['/main/pin']);
  }
}
