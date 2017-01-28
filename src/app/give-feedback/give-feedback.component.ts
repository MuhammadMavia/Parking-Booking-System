import {Component, OnInit} from '@angular/core';
declare let firebase: any;

@Component({
  selector: 'app-give-feedback',
  templateUrl: './give-feedback.component.html',
  styleUrls: ['./give-feedback.component.css']
})
export class GiveFeedbackComponent implements OnInit {

  feedback: any = {};
  feedbacks: any = [];
  userData: any = JSON.parse(localStorage.getItem('profile'));

  constructor() {
    this.loadFeedBack();
  }

  addFeedback() {
    this.feedback.time = Date.now();
    this.feedback.userID = this.userData.id;
    firebase.database().ref().child('feedback').push(this.feedback);
    this.feedback = {};
  }

  loadFeedBack() {
    firebase.database().ref().child('feedback').orderByChild('userID').equalTo(this.userData.id).on('child_added', (f) => {
      let feedback = f.val();
      feedback.id = f.key;
      this.feedbacks.unshift(feedback);
    });
  }

  ngOnInit() {
  }

}
