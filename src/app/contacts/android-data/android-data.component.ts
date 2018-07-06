import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'android-data',
  templateUrl: './android-data.component.html',
  styleUrls: ['./android-data.component.css']
})
export class AndroidDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log("Within android-data init")
  }

}
