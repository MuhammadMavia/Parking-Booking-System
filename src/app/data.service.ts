import {Injectable} from '@angular/core';
declare let firebase: any;

@Injectable()
export class DataService {
  // parkingAreas: any = [];
  selectedParkingArea: any = {};
  selectedParkingAreaIndex: any;
  newEntryTime: any = {};

  parkingAreas = [
    {
      "name": "Parking plaza",
      "slots": [{
        "endTime": 1485508624373,
        "startTime": 1485508624373,

      }, {
        "endTime": 1485508624373,
        "startTime": 1485508624373,

      }, {
        "endTime": 1485508624373,
        "startTime": 1485508624373,
        "userID": "id"
      }, {
        "endTime": 1485508624373,
        "startTime": 1485508624373,
        "userID": "id"
      }, {
        "endTime": 1485508624373,
        "startTime": 1485508624373,
        "userID": "id"
      }]
    }, {
      "name": "Dolmen mall",
      "slots": [{
        "endTime": 1485508749228,
        "reserved": false,
        "startTime": 1485508749228,
        "userID": "id"
      }, {
        "endTime": 1485508749228,
        "reserved": false,
        "startTime": 1485508749228,
        "userID": "id"
      }, {
        "endTime": 1485508749228,
        "reserved": false,
        "startTime": 1485508749228,
        "userID": "id"
      }, {
        "endTime": 1485508749228,
        "reserved": false,
        "startTime": 1485508749228,
        "userID": "id"
      }, {
        "endTime": 1485508749228,
        "reserved": false,
        "startTime": 1485508749228,
        "userID": "id"
      }]
    }, {
      "name": "Pari mall",
      "slots": [{
        "endTime": 1485508783875,
        "reserved": true,
        "startTime": 1485508783875,
        "userID": "id"
      }, {
        "endTime": 1485508783875,
        "reserved": true,
        "startTime": 1485508783875,
        "userID": "id"
      }, {
        "endTime": 1485508783875,
        "reserved": true,
        "startTime": 1485508783875,
        "userID": "id"
      }, {
        "endTime": 1485508783875,
        "reserved": true,
        "startTime": 1485508783875,
        "userID": "id"
      }, {
        "endTime": 1485508783875,
        "reserved": false,
        "startTime": 1485508783875,
        "userID": "id"
      }]
    }
  ];


  constructor() {
    // this.loadParking()
  }

  loadParking() {
    firebase.database().ref('parking').on('child_added', (p) => {
      let area = p.val();
      area.id = p.key;
      this.parkingAreas.unshift(area);
    });
    /*firebase.database().ref('parking').on('child_changed', (p) => {
      let area = p.val();
      area.id = p.key;
      this.parkingAreas.forEach((val, i) => {
        if (val.id == area.id) {
          this.parkingAreas[i] = area;
        }
      });
      this.parkingAreas.unshift(area);
    });*/
  }

}
