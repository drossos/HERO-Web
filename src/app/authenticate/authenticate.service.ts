import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Therapist} from './therapist';
import {SHA512} from 'crypto-js';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthenticateService {
	private therapistsUrl = '/api/therapists';
  static signIn : boolean = true;
  list : boolean = false;
  static signUp : boolean = false;
  //tab in db
  private therapistsRoute = "/therapists";
  therapistList: AngularFireList<any>;



  constructor(private http: Http, public firebase :AngularFireDatabase, public fbAuth : AngularFireAuth) { }
	
    public signInUpToggle(){
      console.log("signUp:" + AuthenticateService.signUp + " signIn:" + AuthenticateService.signIn);
    AuthenticateService.signIn = !AuthenticateService.signIn;
    AuthenticateService.signUp = !AuthenticateService.signUp;
  }

  public authCopy(){
    return {
      signIn: AuthenticateService.signIn,
      signUp: AuthenticateService.signUp
    }
  }

    //get therapist list from firebase
    getTherapists() {
    	console.log("In auth service");
      //returns the entire database
      this.therapistList =  this.firebase.list(this.therapistsRoute);
      return this.therapistList;
    }

    // post("/api/therapists")
    createTherapist(newTherapist: Therapist){
      var newId = newTherapist.name + "_" + (Math.random()*100).toFixed(0);

       this.fbAuth.auth.createUserWithEmailAndPassword(newTherapist.name, newTherapist.hash);
      this.firebase.object(this.therapistsRoute+"/" + newId).set({
        id: newId,
        name: newTherapist.name,
        email: newTherapist.email,
        hash: newTherapist.hash,
        salt: newTherapist.salt,
      });
    }


    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }

    saltGenerator(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    sha512Encrypt(password, salt) {
        var hash = SHA512(password+""+salt).toString(); /** Hashing algorithm sha512 */
        //var value = hash.digest('hex');
        //return password + salt hashed value
        return hash;
    }

    verrifyPassword(encrypted, salt, input) {
      console.log(this.sha512Encrypt(input, salt) + " " + encrypted)
        if (this.sha512Encrypt(input, salt) === encrypted)
            return true;
        return false;
    }
}
