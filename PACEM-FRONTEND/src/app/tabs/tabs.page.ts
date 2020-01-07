import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../authentication/login/service/login.service';
import {SocketClientService} from '../service/socket-client.service';
import {Observable} from 'rxjs';
import {GlobalStorageService} from '../service/global-storage.service';
import {InviteDomain} from '../models/domain-model/invite.domain';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    private inviteDomain: InviteDomain[] = [];
    private subIsDone = false;

    constructor(private loginService: LoginService,
                private socketClientService: SocketClientService,
                private globalStorageService: GlobalStorageService,
                private changeDetectorRef: ChangeDetectorRef) {
        this.loginService.checkIfUserIsLoggedAndRedirect();
    }

    ionViewDidEnter() {
        console.log("hoi");
        this.globalStorageService.isLoggedIn().then(() => {

            console.log("hoi2");
            if (!this.subIsDone) {
                console.log("hoi3");

                this.subIsDone = true;
                this.socketClientService.getEvents().subscribe((data: InviteDomain[]) => {

                    console.log(data);
                    this.globalStorageService.getUserId().then((userId) => {
                        this.inviteDomain = [];
                        if (data.length > 0) {
                            console.log(userId);
                            const filteredData = data.filter((invitationDomain) => invitationDomain.invitee.userId == userId);
                            filteredData.forEach((invite) => {
                                this.inviteDomain.push(invite);
                                this.changeDetectorRef.detectChanges();
                            });

                            this.changeDetectorRef.detectChanges();
                        }
                    }).catch(() => {

                    });
                });
            }
        }).catch(() => {
            this.subIsDone = false;
        });
    }
}
