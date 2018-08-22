import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { AngularFireDatabase, AngularFireList, DatabaseQuery} from 'angularfire2/database'
import {Observable} from "rxjs";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCbmXlJfBmRQlV1Wk1IkOwX3iKeeOSqMNY",
    authDomain: "hero-d6297.firebaseapp.com",
    databaseURL: "https://hero-d6297.firebaseio.com",
    projectId: "hero-d6297",
    storageBucket: "hero-d6297.appspot.com",
    messagingSenderId: "174077758217"
  }
};



@Injectable()
export class ContactService {
    private contactsUrl = '/api/contacts';

    //for getting the current patient contact to be sharable
    //static so the currContact is same for all components
    static currContact:Contact = {
      name: '',
      metric1: 0,
      metric2: 0,
      metric3: 0,
    };

    public patientRoute = "/patients";
    contactList: AngularFireList<any>;

    constructor (private http: Http, public firebase :AngularFireDatabase) {}

    ngOnInit(){
      this.contactList = this.firebase.list(this.patientRoute);
    }


    // get("/api/contacts")
    getContacts(){
      console.log("getting contacts")
      this.contactList = this.firebase.list(this.patientRoute);
      return this.contactList;
    }

    // post("/api/contacts")
    createContact(newContact: Contact){
      var newId = newContact.name + "_" + (Math.random()*100).toFixed(0);
      this.firebase.object(this.patientRoute+"/" + newId).set({
        id: newId,
        name: newContact.name,
        metric1: newContact.metric1,
        metric2: newContact.metric2,
        metric3: newContact.metric3,
      });
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    //TODO FIX SO CAN FIND ID AND USE THAT TO DELETE FROM DATABASE
    deleteContact(delContactId: String) {
      this.firebase.object(this.patientRoute+"/"+delContactId).remove();
    }

    // put("/api/contacts/:id")
    updateContact(putContact: Contact){
      this.firebase.object(this.patientRoute+"/" + putContact.id).set({
        id: putContact.id,
        name: putContact.name,
        metric1: putContact.metric1,
        metric2: putContact.metric2,
        metric3: putContact.metric3,
      });
    }

    static getCurrContact(){
      return ContactService.currContact;
    }

    static setCurrContact(contact:Contact){
       ContactService.currContact = contact;
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }

}