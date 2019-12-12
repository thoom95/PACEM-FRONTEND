import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  loginNaam: string;
  loginPassword: string;


  constructor() {}

  submitLoginCredentials() {
  }

}
