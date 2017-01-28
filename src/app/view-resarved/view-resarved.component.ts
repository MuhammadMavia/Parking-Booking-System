import {Component, OnInit} from '@angular/core';
declare let firebase: any;
import {DataService}from '../data.service'

@Component({
  selector: 'app-view-resarved',
  templateUrl: './view-resarved.component.html',
  styleUrls: ['./view-resarved.component.css']
})
export class ViewResarvedComponent implements OnInit {
  entries: any = [];
  userData: any = JSON.parse(localStorage.getItem('profile'));

  constructor( public ds: DataService) {
    this.loadMyEntry();
  }

  loadMyEntry() {
    firebase.database().ref('entries').orderByChild('userID').equalTo(this.userData.id).on('child_added', (e) => {
      let en = e.val();
      this.entries.unshift(en);
    })
  }

  ngOnInit() {
  }

}
