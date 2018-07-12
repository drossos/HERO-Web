import { Component, OnInit, Input } from '@angular/core';
//import { AuthenticationService, TokenPayload } from '../authenticate.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
/*import {AppComponent} from '../../app.component'*/
import { ContactListComponent} from '../../contacts/contact-list/contact-list.component';
import {Therapist} from '../therapist';
import {AuthenticateService} from '../authenticate.service';
import {Contact} from '../../contacts/contact';
//TODO HAVE TO CAST THERAPIST AS ANY FOR IT TO READ PROPERTIES

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticateService]
})
export class SignInComponent implements OnInit {

  
  @Input()
  currTherapist : Therapist;
  therapist:Therapist;
  therapists:Therapist[];
  signIn : boolean = true;
	//contactList : ContactListComponent;
 	/*credentials: TokenPayload = {
    email: '',
    password: ''
	};*/

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

  login(form : NgForm){
    console.log(form.value);
    
    if (this.fetchTherapist(form))
      this.signIn = false;
    else 
      console.log("non-valid therapist");
  }

  fetchTherapist(form){
    for (var i=0; i < this.therapists.length; i++){
       if ((this.therapists[i] as any).name === (form.value).name && (this.therapists[i] as any).hash === (form.value).password)
         return true;
    }
    return false;
  }

}
