import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  email: string;

  constructor(private router: Router) {}

    logout() {
      this.router.navigateByUrl('/logout');
    }

    sendEmail() {
      console.log(this.email);
      const link = 'mailto:' + this.email +
                   '?subject=Uitnodiging Pacem' +
      '&body=Hallo, Je bent uitgenodigd voor de Pacem app. Je kunt hem via deze link bereiken: https://pacem-frontend.firebaseapp.com';

      window.location.href = link;
      this.email = '';
    }
}
