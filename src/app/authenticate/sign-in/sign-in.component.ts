import { Component, OnInit, Input } from '@angular/core';
//import { AuthenticationService, TokenPayload } from '../authenticate.service';
import { Router } from '@angular/router';
/*import {AppComponent} from '../../app.component'*/
import { ContactListComponent} from '../../contacts/contact-list/contact-list.component';
import {Therapist} from '../therapist';
import {AuthenticateService} from '../authenticate.service';
//TODO IMPLIMENT A USER DATABASE TO ALLOW FOR ONLY SOME PEOPLE TO BE ALLOWED IN

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticateService]
})
export class SignInComponent implements OnInit {

  
  @Input()
  therapist :Therapist;

  signIn : boolean = true;
	contactList : ContactListComponent;
 	/*credentials: TokenPayload = {
    email: '',
    password: ''
	};*/

  constructor(private authService:AuthenticateService) { }

  ngOnInit() {
  }

  login(){
    var dbArr = this.authService.getTherapists();

    if (this.fetchTherapist(dbArr))
      this.signIn = false;
    else 
      console.log("non-valid therapist");
  }

  fetchTherapist(dbArr){
    for (var i=0; i < dbArr.length; i++){
       if ((dbArr[i] as any).name === (this.therapist as any).name && (dbArr[i] as any).hash === (this.therapist as any).hash)
         return true;
    }
    return false;
  }

}
