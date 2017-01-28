import {Component, OnInit} from '@angular/core';
import {DataService}from '../data.service'
declare let firebase: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  feedbacks: any = [];
  entries: any = [];

  constructor(public ds: DataService) {
    this.loadFeedBack();
    this.loadEntry();
  }

  loadEntry() {
    firebase.database().ref('entries').on('child_added', (e) => {
      let en = e.val();
      this.entries.unshift(en);
    })
  }

  loadFeedBack() {
    firebase.database().ref().child('feedback').on('child_added', (f) => {
      let feedback = f.val();
      feedback.id = f.key;
      this.feedbacks.unshift(feedback);
    });
  }

  ngOnInit() {
  }

}
