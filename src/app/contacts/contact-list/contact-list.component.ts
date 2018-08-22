import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import {AndroidDataComponent} from '../android-data/android-data.component';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {Observable} from "rxjs";

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {
  contacts: AngularFireList<Contact>;
  selectedContact: Contact
  contactsArr: {}[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
     this.contacts = this.contactService.getContacts();

     //put contacts into easily useable form
     this.contacts.valueChanges().subscribe(p=>{
        this.contactsArr = p;
      });
      console.log(this.contactsArr);

  }

  private getIndexOfContact = (contactId: String) => {
    for (var i =0; i < this.contactsArr.length; i++){
      if ((this.contactsArr[i] as any).id === contactId)
        return i;
    }
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    ContactService.setCurrContact(this.selectedContact);

  }

  createNewContact() {
    var contact: Contact = {
      name: '',
      metric1: 0,
      metric2: 0,
      metric3: 0,
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
     // this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact.id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
}