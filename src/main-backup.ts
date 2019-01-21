// declare var serviceDiscovery: any;
//
// let app = {
//   initialize: () => {
//     document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//   },
//   onDeviceReady: () => {
//
//     const serviceType = 'ssdp:all';
//
//     const success = (devices) => {
//
//       const pi = devices.filter((device) => device.ST.includes('RaspberryPiDevice'));
//       const a = document.createElement('a');
//       a.href = pi[0].LOCATION;
//       const host = a.hostname;
//       console.log(host);
//       alert(host);
//     };
//
//     const failure = () => {
//       alert('Error calling Service Discovery Plugin');
//     };
//
//     /**
//      * Similar to the W3C specification for Network Service Discovery api 'http://www.w3.org/TR/discovery-api/'
//      * @method getNetworkServices
//      * @param {String} serviceType e.g. "urn:schemas-upnp-org:service:ContentDirectory:1", "ssdp:all", "urn:schemas-upnp-org:service:AVTransport:1"
//      * @param {Function} success callback an array of services
//      * @param {Function} failure callback
//      */
//     serviceDiscovery.getNetworkServices(serviceType, success, failure);
//   }
// };
//
// app.initialize();
