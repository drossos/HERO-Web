import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {
    private contactsUrl = '/api/contacts';

    //for getting the current patient contact to be sharable
    //static so the currContact is same for all components
    static currContact:Contact = {
      name: '',
      metric1: -1,
      metric2: -1,
      metric3: -1,
    };

    constructor (private http: Http) {}

    // get("/api/contacts")
    getContacts(): Promise<Contact[]> {
      return this.http.get(this.contactsUrl)
                 .toPromise()
                 .then(response => response.json() as Contact[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createContact(newContact: Contact): Promise<Contact> {
      return this.http.post(this.contactsUrl, newContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteContact(delContactId: String): Promise<String> {
      return this.http.delete(this.contactsUrl + '/' + delContactId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateContact(putContact: Contact): Promise<Contact> {
      var putUrl = this.contactsUrl + '/' + putContact._id;
      return this.http.put(putUrl, putContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
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