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
    let inviteDomain: InviteDomain = {
      activityTitle: 'Hardlopen',
  };

this.activityDomains.push(activityDomain);

  this.activityDomains.push(activityDomain);
  }
}
