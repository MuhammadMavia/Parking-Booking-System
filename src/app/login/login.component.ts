import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare let firebase: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(public router: Router) {


  }

  createParking() {
    let a = {
      name: 'Pari mall',
      slots: [
        {
          reserved: false,
          startTime: Date.now(),
          endTime: Date.now(),
          userID: 'id'
        },
        {
          reserved: false,
          startTime: Date.now(),
          endTime: Date.now(),
          userID: 'id'
        },
        {
          reserved: false,
          startTime: Date.now(),
          endTime: Date.now(),
          userID: 'id'
        },
        {
          reserved: false,
          startTime: Date.now(),
          endTime: Date.now(),
          userID: 'id'
        },
        {
          reserved: false,
          startTime: Date.now(),
          endTime: Date.now(),
          userID: 'id'
        },
      ]
    };
    console.log(a);
    firebase.database().ref('parking').push(a)
  }


  doLogin() {
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
      (data) => {
        localStorage.setItem('userID', data.uid);
        firebase.database().ref('users/' + data.uid).once('value', (userData) => {
          let user = userData.val();
          if (user) {
            localStorage.setItem('profile', JSON.stringify(user));
            this.router.navigate(['/select-area']);
          }
          else {
            this.router.navigate(['/adminDashboard']);
          }
        });
      }, (err) => {
        alert(err.message);
      });
  }

  ngOnInit() {
  }

}
