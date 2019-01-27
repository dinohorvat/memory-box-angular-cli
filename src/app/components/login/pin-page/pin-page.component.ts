import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pin-page',
  templateUrl: './pin-page.component.html',
  styleUrls: ['./pin-page.component.scss']
})

export class PinPageComponent implements OnInit {
  pin;
  wifiStatus;
  constructor(private globalService: GlobalService, private auth: AuthService,
              private router: Router) {}
  ngOnInit(): void {

  }

  authenticate() {
    this.wifiStatus = 'Connecting to device...';
    this.globalService.authenticateWithPin(this.pin).subscribe((res: any) => {
      if (res.success) {
        alert('You are connected now.');
        this.auth.authenticated = true;
        this.router.navigate(['/main/deviceselect']);
      } else {
        alert('PIN Error');
        this.wifiStatus = 'PIN Error';
        this.auth.authenticated = false;
      }

    });
  }
}
