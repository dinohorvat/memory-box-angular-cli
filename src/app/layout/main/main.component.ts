import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../services/auth.service';
declare var $;
declare var serviceDiscovery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  blockUi;
  constructor (public globalService: GlobalService, private ref: ChangeDetectorRef,
               public authService: AuthService) {
    $('#preloader').removeClass('hide-preloader');
    this.globalService.pilocalIP.subscribe((data) => {
      console.log(data);
      alert('ready')
      $('#preloader').addClass('hide-preloader');
    });
    this.globalService.blockUi.subscribe((res) => {
      this.blockUi = res;
      ref.markForCheck();
      ref.detectChanges();
    });
  }
  ngOnInit(): void {
    const cordovaAp = {
      // Application Constructor
      initialize: () => {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      },

      // deviceready Event Handler
      //
      // Bind any cordova events here. Common events are:
      // 'pause', 'resume', etc.
    };

    cordovaAp.initialize();
  }
  public onDeviceReady() {
    const serviceType = 'ssdp:all';

    const success = (devices) => {
      console.log(devices);
      const pi = devices.filter((device) => device.ST.includes('RaspberryPiDevice'));
      const a = document.createElement('a');
      a.href = pi[0].LOCATION;
      const host = a.hostname;
      this.globalService.piLocal = host;
      this.authService.node_url_1 = 'http://' + host + ':3000';
      console.log(host);
    };

    const failure = () => {
      alert('Error calling Service Discovery Plugin');
    };

    /**
     * Similar to the W3C specification for Network Service Discovery api 'http://www.w3.org/TR/discovery-api/'
     * @method getNetworkServices
     * @param {String} serviceType e.g. "urn:schemas-upnp-org:service:ContentDirectory:1", "ssdp:all", "urn:schemas-upnp-org:service:AVTransport:1"
     * @param {Function} success callback an array of services
     * @param {Function} failure callback
     */
    serviceDiscovery.getNetworkServices(serviceType, success, failure);
  }


}
