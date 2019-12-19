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
        this.socketClientService.getEvents().subscribe((data: InviteDomain[] | InviteDomain) => {
            this.globalStorageService.getUserId().then((userId) => {
                if (Array.isArray(data)) {
                    const filteredData = data.filter((invitationDomain) => invitationDomain.invitee.userId === userId);
                    filteredData.forEach((invite) => {
                        if (this.inviteDomain.findIndex((inv) => inv.activity.activityId === invite.activity.activityId) < 0) {
                            this.inviteDomain.push(invite);
                        }
                    });
                } else {
                    if (this.inviteDomain.findIndex((inv) => inv.activity.activityId === data.activity.activityId) < 0) {
                        this.inviteDomain.push(data);
                    }
                }

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
