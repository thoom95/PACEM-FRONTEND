import { Component, OnInit } from '@angular/core';
import {LogoutService} from './service/logout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService, private router: Router) {
  }

  ngOnInit() {
    this.logout();
  }

  public logout() {
    this.logoutService.logOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
