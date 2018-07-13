import { Component, OnInit, Input } from '@angular/core';
//import { AuthenticationService, TokenPayload } from '../authenticate.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
/*import {AppComponent} from '../../app.component'*/
import { ContactListComponent} from '../../contacts/contact-list/contact-list.component';
import {Therapist} from '../therapist';
import {AuthenticateService} from '../authenticate.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [AuthenticateService]
})
export class SignUpComponent implements OnInit {

	@Input()
  	currTherapist : Therapist;
  	therapist:Therapist;
 	therapists:Therapist[];


  constructor(private authService:AuthenticateService) { }

  ngOnInit() {

  	this.authService
      .getTherapists()
      .then((therapists: Therapist[]) => {
        this.therapists = therapists.map((therapist) => {
          if (!(therapist as any).name) {
            (therapist as any).name = "default";
          }
          return therapist;
        });
      });
  }

  register(form : NgForm){
  	console.log(form.value);
  	var newTherapist : Therapist = {
  		name : form.value.name,
  		email: form.value.email,
  		hash: form.value.password,
  		salt : "nohash"
  	}
  	this.addTherapist(newTherapist);
  }

  addTherapist = (newTherapist : Therapist) => {
  	this.therapists.push(newTherapist);
  	this.authService.createTherapist(newTherapist);
  	AuthenticateService.signIn = false;
  	AuthenticateService.signUp = false;
  	return this.therapists;
  }

}
