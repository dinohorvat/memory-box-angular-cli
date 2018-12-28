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
    this.auth.current_pi_ip = ip;
    this.auth.current_mac = mac;
    this.auth.node_url_1 = 'http://' + ip.trim() + ':31415';
    this.auth.piweb_url_1 = 'http://' + ip.trim();
    this.auth.allowPinPage = true;
    this.router.navigate(['/main/pin']);
  }
}
