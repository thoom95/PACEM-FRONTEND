import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivityDomain} from '../../models/domain-model/activity.domain';
import {Storage} from '@ionic/storage';

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
}
