import { Component } from '@angular/core';
import { InviteDomain } from '../models/domain-model/invite.domain';

@Component({
  selector: 'app-invites',
  templateUrl: 'invites.page.html',
  styleUrls: ['invites.page.scss']
})
export class InvitesPage {

  invites: InviteDomain[] = [];

  constructor() {
    const inviteDomain: InviteDomain = {
      activityTitle: 'Hardlopen',
      inviter: 'Harry',
      location: 'HAN Nijmegen',
      date: '12-09-2019',
      startTime: '13:00',
      endTime: '14:00'
    };

    this.invites.push(inviteDomain);
  }
}
