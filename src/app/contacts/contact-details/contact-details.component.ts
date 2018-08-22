import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  providers: [ContactService]
})

export class ContactDetailsComponent {
  @Input()
  contact: Contact;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private contactService: ContactService) {}
  
  ngOnInit(){
 
  }

  createContact(contact: Contact) {
    this.contactService.createContact(contact);
    this.createHandler();
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact);
    this.updateHandler();
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId);
    this.deleteHandler();
  }
}