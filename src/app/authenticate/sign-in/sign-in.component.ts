import { Component, OnInit } from '@angular/core';
//import { AuthenticationService, TokenPayload } from '../authenticate.service';
import { Router } from '@angular/router';
/*import {AppComponent} from '../../app.component'*/
import { ContactListComponent} from '../../contacts/contact-list/contact-list.component';

//TODO IMPLIMENT A USER DATABASE TO ALLOW FOR ONLY SOME PEOPLE TO BE ALLOWED IN

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signIn : boolean = true;
	contactList : ContactListComponent;
 	/*credentials: TokenPayload = {
    email: '',
    password: ''
	};*/

  constructor() { }

  ngOnInit() {
  }

  login(){
    this.signIn = false;
  }

}
