import {Component, OnInit} from '@angular/core';
import {DataService}from '../data.service'

declare let firebase: any;
@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.css']
})
export class SelectAreaComponent implements OnInit {
  parkingAreas: any = [];

  constructor(public ds: DataService) {
  }



  ngOnInit() {
  }

}
