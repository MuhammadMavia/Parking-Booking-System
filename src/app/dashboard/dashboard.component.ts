import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {DataService}from '../data.service'
declare let firebase: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = JSON.parse(localStorage.getItem('profile'));
  parkingAreas: any = [];
  reservingAreas: any = [];
  timeArray: any = [];
  slots: any = [];
  newData: any = [];
  booking: any;
  entry: any = {};

  constructor(public dialog: MdDialog, public ds: DataService) {
    // this.loadParking();
    this.loadMyReservingAreas();
    ds.newEntryTime.date ? this.loadEntries() : null;
  }

  selectSlot(slot, i) {
    let obj = {
      slot: i,
      userID: this.userData.id,
      reserved: true,
      selectedParkingAreaIndex: this.ds.selectedParkingAreaIndex,
      startTime: this.ds.newEntryTime.startTime,
      endTime: this.ds.newEntryTime.endTime,
      date: this.ds.newEntryTime.date,
      id: this.ds.newEntryTime.date + "id" + this.ds.selectedParkingAreaIndex,
    };
    firebase.database().ref('entries').push(obj);
  }


  loadEntries() {
    let ref = firebase.database().ref('entries').orderByChild('id').equalTo(this.ds.newEntryTime.date + "id" + this.ds.selectedParkingAreaIndex);
    ref.off('child_added');
    ref.on('child_added', (e) => {
      let entry = e.val();
      this.ds.selectedParkingArea.slots.forEach((slot, index) => {
        if (index == entry.slot) {
          if (entry.endTime <= this.ds.newEntryTime.startTime) {
            this.ds.selectedParkingArea.slots[index].reserved = false;
          }
          else if (entry.startTime >= this.ds.newEntryTime.endTime) {
            this.ds.selectedParkingArea.slots[index].reserved = false;
          }
          else {
            this.ds.selectedParkingArea.slots[index].reserved = true;
          }
        }
      });
    })
  }


  checkSlot(slot, area, slotIndex) {
    this.slots = [];
    this.entry.reserved = true;
    this.entry.user = this.userData.id;
    this.entry.slotIndex = slotIndex;
    this.entry.area = area.id;
    this.entry.startTime = new Date(this.entry.date + ' ' + this.entry.startTime).getTime();
    this.entry.endTime = new Date(this.entry.date + ' ' + this.entry.endTime).getTime();
    firebase.database().ref('entries').child(area.id + slotIndex).off('child_added');
    let ref = firebase.database().ref('entries').child(area.id + slotIndex).orderByChild('date').equalTo(this.entry.date);
    let no = false;
    ref.on('child_added', (entry) => {
      let e = entry.val();
      ref.once('value', (a) => {
        this.slots.push(e);
        if (this.entry.endTime <= e.startTime || this.entry.startTime >= e.endTime) {
          console.log(a.numChildren(), this.slots.length);
          if (!no && a.numChildren() == this.slots.length) {
            firebase.database().ref('entries').child(area.id + slotIndex).push(this.entry);
          }
        }
        else {
          no = true;
        }
      });
    });
  }


  loadMyReservingAreas() {
    firebase.database().ref('reservingAreas').child(this.userData.id).on('child_added', (p) => {
      let area = p.val();
      area.id = p.key;
      this.reservingAreas.unshift(area);
    });
  }

  loadParking() {
    firebase.database().ref('parking').on('child_added', (p) => {
      let area = p.val();
      area.id = p.key;
      this.parkingAreas.unshift(area);
    });
    firebase.database().ref('parking').on('child_changed', (p) => {
      let area = p.val();
      area.id = p.key;
      this.parkingAreas.forEach((val, i) => {
        if (val.id == area.id) {
          this.parkingAreas[i] = area;
        }
      });
      this.parkingAreas.unshift(area);
    });
  }

  ngOnInit() {
  }

}







