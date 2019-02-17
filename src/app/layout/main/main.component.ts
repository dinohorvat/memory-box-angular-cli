import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../services/auth.service';
import {DiscoveryService} from '../../services/discovery.service';
declare var $;
declare var serviceDiscovery: any;
declare var hello: any;
declare var networkinterface: any;
declare var bluetoothle: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  blockUi;
  constructor (public globalService: GlobalService, private ref: ChangeDetectorRef,
               public authService: AuthService, public discoveryService: DiscoveryService) {
    $('#preloader').removeClass('hide-preloader');
    // this.globalService.pilocalIP.subscribe((data) => {
    //   console.log(data);
    //   alert('ready')
    //   $('#preloader').addClass('hide-preloader');
    // });
    // this.globalService.blockUi.subscribe((res) => {
    //   this.blockUi = res;
    //   ref.markForCheck();
    //   ref.detectChanges();
    // });
  }
  ngOnInit(): void {

    const cordovaAp = {
      // Application Constructor
      initialize: () => {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      },
    };

    cordovaAp.initialize();
  }
  public onDeviceReady() {
    const initializeResult: Object = {};
    const params: object = {
      'request': true,
      'statusReceiver': false,
      'restoreKey': 'bluetoothleplugin'
    };
    bluetoothle.initialize(() => {
      console.log('bluetooth Initialized');
      alert('initialized');
    }, params);

    const success = (message) => {
      alert(message);
      console.log(message);
      const n = message.lastIndexOf('/');
      const result = message.substring(n + 1);
      this.authService.node_url_1 = 'http://' + result + ':3000';
      console.log(this.authService.node_url_1);
    };

    const failure = () => {
      alert('Error calling Hello Plugin');
    };

    function onSuccess( ipInformation ) {
      const ip = ipInformation.ip;
      alert(ip);
      hello.greet(ip, success, failure);
    }

    function onError( error ) {

      // Note: onError() will be called when an IP address can't be found. eg WiFi is disabled, no SIM card, Airplane mode etc.
      console.log(error);
    }

    networkinterface.getWiFiIPAddress( onSuccess, onError );
    networkinterface.getCarrierIPAddress( onSuccess, onError );

  }
  // public onDeviceReady() {
  //   const serviceType = 'ssdp:all';
  //
  //   const success = (devices) => {
  //     console.log(devices);
  //     const pi = devices.filter((device) => device.ST.includes('RaspberryPiDevice'));
  //     const a = document.createElement('a');
  //     a.href = pi[0].LOCATION;
  //     const host = a.hostname;
  //     this.globalService.piLocal = host;
  //     this.authService.node_url_1 = 'http://' + host + ':3000';
  //     console.log(host);
  //   };
  //
  //   const failure = () => {
  //     alert('Error calling Service Discovery Plugin');
  //   };
  //
  //   /**
  //    * Similar to the W3C specification for Network Service Discovery api 'http://www.w3.org/TR/discovery-api/'
  //    * @method getNetworkServices
  //    * @param {String} serviceType e.g. "urn:schemas-upnp-org:service:ContentDirectory:1", "ssdp:all", "urn:schemas-upnp-org:service:AVTransport:1"
  //    * @param {Function} success callback an array of services
  //    * @param {Function} failure callback
  //    */
  //   serviceDiscovery.getNetworkServices(serviceType, success, failure);
  // }


}
