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

    constructor(private activitiesService: ActivitiesService,
                public modalController: ModalController) {
        this.activitiesService.getEvents().subscribe((data) => {
            this.activityDomains = data.sort((a, b) =>
                a.activityId < b.activityId ? -1 : a.activityId > b.activityId ? 1 : 0);
        });
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
            this.activitiesService.getEvents().subscribe((data) => {
                this.activityDomains = data.sort((a, b) =>
                    a.activityId < b.activityId ? -1 : a.activityId > b.activityId ? 1 : 0);
            });
        }, 800);
    }

    public openForm() {
        this.presentModal();
    }
}
