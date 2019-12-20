import {Component} from '@angular/core';
import {ActivitiesService} from './service/activities.service';
import {ActivityDomain} from '../models/domain-model/activity.domain';
import {UserDomain} from '../models/domain-model/user.domain';
import {ModalController} from '@ionic/angular';
import {CreateActivitiesComponent} from '../create-activities/create-activities.component';

@Component({
    selector: 'app-activities',
    templateUrl: 'activities.page.html',
    styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {

    private activityDomains: ActivityDomain[] = [];

    ionViewWillEnter() {
        this.activitiesService.getEvents().then((data) => {
            this.activityDomains = [];
            data.forEach((activity) => {
                this.activityDomains.push(activity);
            });
            this.activityDomains = this.activityDomains.sort((a, b) =>
                a.activityId < b.activityId ? -1 : a.activityId > b.activityId ? 1 : 0);
        });
    }

    constructor(private activitiesService: ActivitiesService,
                public modalController: ModalController) {

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
            this.activityDomains = [];
            this.activitiesService.getEvents().then((data) => {
                data.forEach((activity) => {
                    this.activityDomains.push(activity);
                });

                this.activityDomains = this.activityDomains.sort((a, b) =>
                    a.activityId < b.activityId ? -1 : a.activityId > b.activityId ? 1 : 0);
            });
        }, 800);
    }

    public openForm() {
        this.presentModal();
    }
}
