import {Component, OnInit} from '@angular/core';
declare let firebase: any;
import {DataService}from '../data.service'
@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {
  userData: any = JSON.parse(localStorage.getItem('profile'));
  parkingAreas: any = [];
  reservingAreas: any = [];
  timeArray: any = [];
  slots: any = [];
  newData: any = [];
  booking: any;
  entry: any = {};
  newEntryTime: any = {};

  constructor(public ds: DataService) {
    this.setTimeArray();
  }


  setNewEntryTime() {
    this.ds.newEntryTime = {
      startTime: new Date(this.entry.date + ' ' + this.entry.startTime).getTime(),
      endTime: new Date(this.entry.date + ' ' + this.entry.endTime).getTime(),
      date: this.entry.date,
    }
  }

  setTimeArray() {
    for (let i = 1; i < 24; i++) {
      this.timeArray.push(i + ':00')
    }
  }


  checkSlot(slot, area, slotIndex) {
    this.slots = [];
    this.entry.reserved = true;
    this.entry.user = this.userData.id;
    this.entry.slotIndex = slotIndex;
    this.entry.area = area.id;
    this.entry.startTime = new Date(this.entry.date + ' ' + this.entry.startTime).getTime();
    this.entry.endTime = new Date(this.entry.date + ' ' + this.entry.endTime).getTime();
    firebase.database().ref('entries').child(area.id).off('child_added');
    let ref = firebase.database().ref('entries').child(area.id).orderByChild('date').equalTo(this.entry.date);
    let no = false;
    ref.on('child_added', (entry) => {
      let e = entry.val();
      ref.once('value', (a) => {
        this.slots.push(e);
        if (this.entry.endTime <= e.startTime || this.entry.startTime >= e.endTime) {
          console.log(a.numChildren(), this.slots.length);
          if (!no && a.numChildren() == this.slots.length) {
            firebase.database().ref('entries').child(area.id).push(this.entry);
          }
        }
        else {
          no = true;
        }
      });
    });
  }

  ngOnInit() {
  }

}
