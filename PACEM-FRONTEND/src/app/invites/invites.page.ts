import {ChangeDetectorRef, Component} from '@angular/core';
import {InviteDomain} from '../models/domain-model/invite.domain';
import {InvitesService} from './service/invites.service';
import {GlobalStorageService} from '../service/global-storage.service';
import {SocketClientService} from '../service/socket-client.service';

@Component({
    selector: 'app-invites',
    templateUrl: 'invites.page.html',
    styleUrls: ['invites.page.scss']
})
export class InvitesPage {

    private inviteDomain: InviteDomain[] = [];

    constructor(private invitesService: InvitesService,
                public globalStorageService: GlobalStorageService,
                public changeDetectorRef: ChangeDetectorRef,
                private socketClientService: SocketClientService) {
        this.socketClientService.getEvents().subscribe((data: InviteDomain[]) => {
            this.globalStorageService.getUserId().then((userId) => {

                this.inviteDomain = data.filter((invitation) => {
                    return invitation.invitee.userId == userId;
                });

                this.changeDetectorRef.detectChanges();
            });
        });
    }

    acceptInvite(inviteId: number) {
        this.invitesService.acceptInvite(inviteId);

    }

    refuseInvite(inviteId: number) {
        this.invitesService.declineInvite(inviteId);
    }
}
