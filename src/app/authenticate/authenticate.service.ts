import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Therapist} from './therapist';
import {SHA512} from 'crypto-js';
//import * as crypto from 'crypto-js';
//import * as randomBytes from 'random-bytes';
import 'rxjs/add/operator/toPromise';
/*import {RandomBytes} from 'random-bytes'
import {RandomString} from 'randomstring';*/
//import {RandomString} from '@types/random-string';
@Injectable()
export class AuthenticateService {
	private therapistsUrl = '/api/therapists';
  static signIn : boolean = true;
  list : boolean = false;
  static signUp : boolean = false;

  constructor(private http: Http) { }
	
    signInUpToggle(){
      console.log("signUp:" + AuthenticateService.signUp + " signIn:" + AuthenticateService.signIn);
    AuthenticateService.signIn = !AuthenticateService.signIn;
    AuthenticateService.signUp = !AuthenticateService.signUp;
  }

  authCopy(){
    return {
      signIn: AuthenticateService.signIn,
      signUp: AuthenticateService.signUp
    }
  }

	// get("/api/therapists")
    getTherapists(): Promise<Therapist[]> {
    	console.log("In auth service");
      return this.http.get(this.therapistsUrl)
                 .toPromise()
                 .then(response => response.json() as Therapist[])
                 .catch(this.handleError);
    }

    // post("/api/therapists")
    createTherapist(newTherapist: Therapist): Promise<Therapist> {
      return this.http.post(this.therapistsUrl, newTherapist)
                 .toPromise()
                 .then(response => response.json() as Therapist)
                 .catch(this.handleError);
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
        var hash = SHA512(password+salt).toString(); /** Hashing algorithm sha512 */
        //var value = hash.digest('hex');
        //return password + salt hashed value
        return hash;
    }

    verrifyPassword(encrypted, salt, input) {
        if (this.sha512Encrypt(input, salt).toUpperCase() === encrypted.toUpperCase())
            return true;
        return false;
    }
}
