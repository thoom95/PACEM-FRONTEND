
import { Component } from '@angular/core';
import { ActivitiesService } from './service/activities.service';
import { ActivityDomain, ActivityLocationDomain, ActivityParticipantsDomain } from '../models/domain-model/activity.domain';
import { UserDomain } from '../models/domain-model/user.domain';

@Component({
    selector: 'app-activities',
    templateUrl: 'activities.page.html',
    styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {

    private activityDomains: ActivityDomain[] = [];
    private userDomains: UserDomain[] = [];

    ionViewWillEnter() {
        this.activitiesService.getEvents().then((data) => {
            this.activityDomains = [];
            data.forEach((activity) => {
                this.activityDomains.push(activity);
            });
        });
    }
    constructor(private activitiesService: ActivitiesService) {
        const user1: UserDomain = {
            userId: 12,
            jwtToken: '12345',
            firstName: 'Thomas',
            lastName: 'Muller',
            emailAddress: 'test',
            status: 'tst'
        };
        const user2: UserDomain = {
            userId: 12,
            jwtToken: '12345',
            firstName: 'Bart',
            lastName: 'KesselRun',
            emailAddress: 'test',
            status: 'tst'
        };
        const user3: UserDomain = {
            userId: 12,
            jwtToken: '12345',
            firstName: 'Laura',
            lastName: 'nogwat',
            emailAddress: 'test',
            status: 'tst'
        };

        this.userDomains.push(user1);
        this.userDomains.push(user2);
        this.userDomains.push(user3);
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

    openForm() {
        document.getElementById('myForm').style.display = 'block';
    }

    closeForm() {
        document.getElementById('myForm').style.display = 'none';
    }

    submitNewActivity() {
        // @TODO
        this.closeForm();
    }
}
