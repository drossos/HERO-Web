import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, Point } from "chart.js";
import {Contact} from '../contact';
import { ContactService } from '../contact.service';
import {ContactListComponent} from '../contact-list/contact-list.component'

@Component({
  selector: 'android-data',
  templateUrl: './android-data.component.html',
  styleUrls: ['./android-data.component.css']
})
export class AndroidDataComponent implements OnInit {

	test : string = "Android Pipes are working";
	testConfirm : string = ""
	toggle : boolean = true;
	canvas: any;
  	ctx: any;
  	myChart:any;
  	selectedContact: Contact;
  	contactList: ContactListComponent;

  constructor() { }

  ngOnInit() {
  	console.log("Within android-data init")

  	//this is just test data for the chart to see if it works
  	this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
  }

  testMethod(){
  	console.log("within test method");
  	if (this.toggle)
  		this.canvas.style.visibility = 'hidden';
  	else
  		this.canvas.style.visibility = 'visible';

  	this.toggle = !this.toggle;
  }

  createGraph(){
  	let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["Metric 1", "Metric 2", "Metric 3"],
          datasets: [{
              label: '# of Votes',
              data: [this.contactList.selectedContact.metric1,this.contactList.selectedContact.metric2,this.contactList.selectedContact.metric3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }

  
}

