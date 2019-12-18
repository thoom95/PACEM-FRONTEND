import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivityDomain} from '../../models/domain-model/activity.domain';
import * as moment from 'moment';
import {InviteDomain} from '../../models/domain-model/invite.domain';

@Component({
    selector: 'app-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.scss'],
})
export class InviteComponent {

    constructor() {
    }

    @Input() invite: InviteDomain;

    @Output() acceptButtonClicked ? = new EventEmitter();
    @Output() refuseButtonClicked ? = new EventEmitter();
}
