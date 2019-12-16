import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivityDomain} from '../../models/domain-model/activity.domain';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {

    constructor(private storage: Storage) {
    }

    @Input() activityDomain: ActivityDomain;

    @Output() primaryButtonClicked ? = new EventEmitter();

    public checkIfParticipating(bool: boolean): string {
        return bool ? 'orange' : '#ffa5007a';
    }

    public checkIfUserIdIsMe(bool: boolean): string {
        return bool ? 'orange' : 'black';
    }

    public getUserId() {
        return new Promise((resolve, reject) => {
            this.storage.get('userId').then((userId) => {
                resolve(userId);
            }).catch(() => {
                reject();
            });
        });
    }
}
