import { Component, OnInit, Input } from '@angular/core';
//import { AuthenticationService, TokenPayload } from '../authenticate.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
/*import {AppComponent} from '../../app.component'*/
import { ContactListComponent} from '../../contacts/contact-list/contact-list.component';
import {Therapist} from '../therapist';
import {AuthenticateService} from '../authenticate.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [AuthenticateService]
})
export class SignUpComponent implements OnInit {

	@Input()
  	public currTherapist : Therapist;
  	public therapist:Therapist;
 	public therapists:AngularFireList<any>;


  constructor(public authService:AuthenticateService) { }

  ngOnInit() {

  	this.authService.getTherapists();

     this.therapists = this.authService
      .getTherapists();
      
  }

  public register(form : NgForm){
  	console.log(form.value);

  	var salt = this.authService.saltGenerator(12);
  	var newTherapist : Therapist = {
      id: "",
  		name : form.value.name,
  		email: form.value.email,
  		hash: this.authService.sha512Encrypt(form.value.password, salt),
  		salt : salt
  	}
  	this.addTherapist(newTherapist);
  }

  public addTherapist = (newTherapist : Therapist) => {
  	//this.therapists.push(newTherapist);
  	this.authService.createTherapist(newTherapist);
  	AuthenticateService.signIn = false;
  	AuthenticateService.signUp = false;
  	return this.therapists;
  }

  signInToggle(){
    this.authService.signInUpToggle();
  }
}
