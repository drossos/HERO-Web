import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { AndroidDataComponent } from './contacts/android-data/android-data.component';
import {ContactService} from './contacts/contact.service';
import { LoginSigninComponent } from './login/login-signin/login-signin.component';
import { LoginSignupComponent } from './login/login-signup/login-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    AndroidDataComponent,
    LoginSigninComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
