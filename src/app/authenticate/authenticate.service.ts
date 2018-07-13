import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Therapist} from './therapist';
import 'rxjs/add/operator/toPromise';

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
}
