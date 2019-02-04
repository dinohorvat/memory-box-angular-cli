import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs-compat/add/observable/fromPromise';

declare var serviceDiscovery: any;

@Injectable()
export class DiscoveryService {
  constructor() {}

  discoverParticleServices(): Promise<any[]> {
    console.log('Start service discovery');
      return new Promise((resolve, reject) => {
        try {
          serviceDiscovery.getNetworkServices(
            'ssdp:all',
            (devices) => {
              console.log('devices', devices);
              const particleDevices = devices.filter(d => {
                const dString = JSON.stringify(d);
                return dString.match('.*Particle.*');
              });
              console.log(JSON.stringify(particleDevices));
              resolve(particleDevices);
            },
            (err) => {
              console.log('ERROR:', err);
              resolve([]);
            }
          );
        } catch (err) {
          console.log(err);
          resolve([]);
        }
      });
  }
}
