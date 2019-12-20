import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivityDomain} from '../../models/domain-model/activity.domain';
import * as moment from 'moment';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {

    constructor() {
    }

    @Input() activityDomain: ActivityDomain;

    @Output() checkInButtonClicked ? = new EventEmitter();

    public checkIfParticipating(bool: boolean): string {

        return bool ? '#f59d24' : '#ffa5007a';
    }

    public checkIfUserIdIsMe(bool: boolean, returnBold: boolean = false): string {
        if (returnBold) {
            return bool ? 'bold' : 'normal';
        } else {
            return bool ? '#f59d24' : 'black';
        }
    }

    convertStringToDate(time: string) {
        const date = moment(time);
        return date.format('MMM D HH:mm');
    }

    getLocationString(activityDomain: ActivityDomain) {
        if (activityDomain.location && activityDomain.location.info) {
            return this.convertStringToDate(activityDomain.startTime) + ' - ' +
                this.convertStringToDate(activityDomain.endTime) + '/ ' + activityDomain.location.info;
        } else if (activityDomain.location && activityDomain.startTime && activityDomain.endTime) {
            return this.convertStringToDate(activityDomain.startTime) + ' - ' +
                this.convertStringToDate(activityDomain.endTime);
        } else {
            return '';
        }
    }
}
