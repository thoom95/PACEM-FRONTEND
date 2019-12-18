import {Component} from '@angular/core';
import {ActivitiesService} from './service/activities.service';
import {ActivityDomain, ActivityLocationDomain, ActivityParticipantsDomain} from '../models/domain-model/activity.domain';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-activities',
    templateUrl: 'activities.page.html',
    styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {

    private activityDomains: ActivityDomain[] = [];

    constructor(private activitiesService: ActivitiesService) {
        activitiesService.getEvents().then((data) => {
            data.forEach((activity) => {
                this.activityDomains.push(activity);
            });
        });
    }

    public checkIn(activityId: number) {
        this.activitiesService.subscribeActivity(activityId);

        setTimeout(() => {
            this.activityDomains = [];
            this.activitiesService.getEvents().then((data) => {
                data.forEach((activity) => {
                    this.activityDomains.push(activity);
                });
            });
        }, 800);
    }
}



