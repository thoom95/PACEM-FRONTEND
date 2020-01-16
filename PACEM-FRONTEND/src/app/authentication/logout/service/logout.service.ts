import { Injectable } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private authenticationService: AuthenticationService) {
  }

  public logOut() {
    return new Promise((resolve) => {
      this.authenticationService.globalStorageService.signUserOut().then(() => {
        resolve();
      }).catch(() => {
        resolve();
      });
    });
  }
}
