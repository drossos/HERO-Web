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
import {Observable} from "rxjs";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//TODO HAVE TO CAST THERAPIST AS ANY FOR IT TO READ PROPERTIES

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticateService]
})
export class SignInComponent implements OnInit {

  
  @Input()
  public currTherapist : Therapist;
  public therapist:Therapist;
  public therapists: AngularFireList<any>;
  public authCopy = {
    signIn: AuthenticateService.signIn,
    signUp: AuthenticateService.signUp
  }
  public therapistArr:{}[];

  public failedSignIn : boolean = false;
	//contactList : ContactListComponent;
 	/*credentials: TokenPayload = {
    email: '',
    password: ''
	};*/

  constructor(public authService:AuthenticateService) { }

  ngOnInit() {

    this.therapists = this.authService
      .getTherapists();
      /*.then((therapists: Therapist[]) => {
        this.therapists = therapists.map((therapist) => {
          if (!(therapist as any).name) {
            (therapist as any).name = "default";
          }
          return therapist;
        });
      });*/

      //this prints the values within the database to the console
      this.therapists.valueChanges().subscribe(p=>{
        this.therapistArr = p;
      });
      console.log(this.therapistArr);
  }

  login(form : NgForm){
    console.log(form.value);
    var foundTherapist = this.fetchTherapist(form);

    if (foundTherapist){
      AuthenticateService.signIn = false;
      AuthenticateService.signUp = false;
      this.authService.firebase.app.auth().signInWithEmailAndPassword(form.value.name, form.value.password);
    }
    else 
      console.log("non-valid therapist");
}

  fetchTherapist(form){
        for (var i =0; i < this.therapistArr.length; i++){
          //map and array
          console.log((this.therapistArr[i] as any));
          console.log((form.value).name);
         if ((this.therapistArr[i] as any).name === (form.value).name && 
         this.authService.verrifyPassword((this.therapistArr[i] as any).hash, (this.therapistArr[i] as any).salt,(form.value).password)){           
        /* console.log(p[4] === (form.value).name && 
         this.authService.verrifyPassword(p[3], p[5],(form.value).password));*/
         return true;
     }
   }

    this.failedSignIn = true;
    return false;
  }

  getSignIn(){
    return this.authService.authCopy().signIn;
  }

  signInToggle(){
    this.authService.signInUpToggle();
  }

/*  updateAuthCopy(){
    this.authCopy = {
      signIn: AuthenticateService.signIn,
      signUp: AuthenticateService.signUp
    }
  }*/

}
