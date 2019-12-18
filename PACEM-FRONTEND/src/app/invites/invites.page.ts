import { Component } from '@angular/core';
import { InviteDomain } from '../models/domain-model/invite.domain';

@Component({
  selector: 'app-invites',
  templateUrl: 'invites.page.html',
  styleUrls: ['invites.page.scss']
})
export class InvitesPage {

  private invites: InviteDomain[] = [];

  constructor() {
/*    const inviteDomain1: InviteDomain = {
      activityTitle: 'Hardlopen',
      inviter: 'Harry',
      location: 'HAN Nijmegen',
      date: '12-09-2019',
      startTime: '13:00',
      endTime: '14:00'
    };

    const inviteDomain2: InviteDomain = {
      activityTitle: 'Fietsen',
      inviter: 'Harry',
      location: 'HAN Nijmegen',
      date: '12-09-2019',
      startTime: '14:00',
      endTime: '16:00'
    };

    const inviteDomain3: InviteDomain = {
      activityTitle: 'Hardlopen',
      inviter: 'Harry',
      location: 'HAN Nijmegen',
      date: '12-09-2019',
      startTime: '11:00',
      endTime: '15:00'
    };

    this.invites.push(inviteDomain1);
    this.invites.push(inviteDomain2);
    this.invites.push(inviteDomain3);
*/
  }

  acceptInvite($event: any) {

  }

  refuseInvite($event: any) {

  }
}
