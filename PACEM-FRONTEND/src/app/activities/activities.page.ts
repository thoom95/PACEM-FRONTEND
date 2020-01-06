import {Component} from '@angular/core';
import {ActivitiesService} from './service/activities.service';
import {ActivityDomain} from '../models/domain-model/activity.domain';
import {UserDomain} from '../models/domain-model/user.domain';
import {ModalController} from '@ionic/angular';
import {CreateActivitiesComponent} from '../create-activities/create-activities.component';
import {GlobalStorageService} from "../service/global-storage.service";

@Component({
    selector: 'app-activities',
    templateUrl: 'activities.page.html',
    styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {

    private activityDomains: ActivityDomain[] = [];

    constructor(private activitiesService: ActivitiesService,
                private globalStorageService: GlobalStorageService,
                public modalController: ModalController) {
        this.retrieveActivities();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CreateActivitiesComponent
        });


        return await modal.present();
    }

    public checkIn(activityId: number) {
        this.activitiesService.subscribeActivity(activityId);

        setTimeout(() => {
            this.retrieveActivities();
        }, 800);
    }

    public openForm() {
        this.presentModal();
    }

    private retrieveActivities() {
        this.globalStorageService.getUserId().then((userId) => {
            this.activitiesService.getEvents().subscribe((data) => {
                this.activityDomains = data.sort((a, b) =>
                    a.activityId - b.activityId);

                this.activityDomains.map((activity) => {
                    activity.participants.map((participant) => {
                        participant.isMe = (participant.userId == userId);
                        return participant;
                    });

                    activity.isParticipating = activity.participants.filter((participant) => {
                        return participant.userId == userId;
                    }).length >= 1;

                    return activity;
                });
            });
        });

    }
}
