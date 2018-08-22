import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { AndroidDataComponent } from './contacts/android-data/android-data.component';
import { SignInComponent } from './authenticate/sign-in/sign-in.component';
import { SignUpComponent } from './authenticate/sign-up/sign-up.component';
import { ContactService } from './contacts/contact.service';
import {AuthenticateService} from './authenticate/authenticate.service';
import {SHA512} from 'crypto-js';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    AndroidDataComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
