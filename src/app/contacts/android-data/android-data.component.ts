import { Component, OnInit, Input} from '@angular/core';
import { Chart, ChartData, Point } from "chart.js";
import {Contact} from '../contact';
import { ContactService } from '../contact.service';
import {ContactListComponent} from '../contact-list/contact-list.component';


@Component({
  selector: 'android-data',
  templateUrl: './android-data.component.html',
  styleUrls: ['./android-data.component.css'],
  providers: [ContactService]
})
export class AndroidDataComponent implements OnInit {
  //contact = ContactService.getCurrContact();
	test : string = "Android Pipes are working";
	testConfirm : string = ""
	toggle : boolean = true;
  graphOpen : boolean = false;
	canvas: any;
  	ctx: any;
  	myChart:any;
  	baseChart:any={
      type: 'pie',
      options: {
        responsive: false,
        display:true
      }
    };



  constructor(private contactService:ContactService) { }

  ngOnInit() {
  	console.log("Within android-data init")

  	//this is just test data for the chart to see if it works
  	this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, this.baseChart);
  }

  testMethod(){
  	console.log("within test method");
  	if (this.toggle){
  		this.canvas.style.visibility = 'hidden';
      this.graphOpen = false;
    }
  	else{
  		this.canvas.style.visibility = 'visible';
      this.graphOpen = true;
    }

  	this.toggle = !this.toggle;
  }

//updates graph to fit data selected
  updateGraph(){
  	this.myChart.data = {
          labels: ["Metric 1", "Metric 2", "Metric 3"],
          datasets: [{
              label: 'Measurment',
              data: [ContactService.getCurrContact().metric1,ContactService.getCurrContact().metric2,ContactService.getCurrContact().metric3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  '#0012FF',
                  '#22FF1D'
              ],
              borderWidth: 1
          }]
      }

      this.myChart.update();
  }

  updateGraphType(type:string){
  	this.myChart.clear();
  	this.myChart.destroy();
  	//this.myChart.destroy();
  	this.baseChart.type = type;
	this.myChart = new Chart(this.ctx, this.baseChart);
  }

  
}

