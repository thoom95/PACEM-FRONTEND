import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivityDomain} from '../../models/domain-model/activity.domain';
import * as moment from 'moment';
import {InviteDomain} from '../../models/domain-model/invite.domain';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.scss'],
})
export class InviteComponent {

    constructor(private domSen: DomSanitizer) {
        moment.locale('nl');
    }

    @Input() invite: InviteDomain;

    @Output() acceptButtonClicked ? = new EventEmitter();
    @Output() refuseButtonClicked ? = new EventEmitter();

    convertStringToDate(time: string) {
        const date = moment.unix(Number(time));
        return date.format('dddd D MMMM');
    }

    convertStringToTime(time: string) {
        const date = moment.unix(Number(time));
        return date.format('HH:mm');
    }
}
