import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../authentication/login/service/login.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(private loginService: LoginService, private changeDetectionRef: ChangeDetectorRef) {
        this.loginService.checkIfUserIsLoggedAndRedirect();
    }

}
