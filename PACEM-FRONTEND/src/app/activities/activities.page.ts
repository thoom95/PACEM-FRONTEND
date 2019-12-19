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
    private userDomains: UserDomain[] = [];

    ionViewWillEnter() {
        this.activitiesService.getEvents().then((data) => {
            this.activityDomains = [];
            data.forEach((activity) => {
                this.activityDomains.push(activity);
            });
        });
    }

    constructor(private activitiesService: ActivitiesService, public modalController: ModalController) {
        const user1: UserDomain = {
            userId: 12,
            jwtToken: '12345',
            firstName: 'Thomas',
            lastName: 'Muller',
            emailAddress: 'test',
            status: 'tst'
        };
        const user2: UserDomain = {
            userId: 11,
            jwtToken: '12345',
            firstName: 'Bart',
            lastName: 'KesselRun',
            emailAddress: 'test',
            status: 'tst'
        };
        const user3: UserDomain = {
            userId: 13,
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
            });
        }, 800);
    }

    public openForm() {
        this.presentModal();
    }

    closeForm() {
        // document.getElementById('myForm').style.display = 'none';
    }


    sendActivity() {
        const data = {
            name: (document.getElementById('actiName') as HTMLInputElement).value,
            maxParticipants: (document.getElementById('actiMaxParticipants') as HTMLInputElement).value,
            startTime: (document.getElementById('actiStartTime') as HTMLInputElement).value,
            endTime: (document.getElementById('actiEndTime') as HTMLInputElement).value,
            location: {
                info: (document.getElementById('actiLocation') as HTMLInputElement).value,
                latitude: 12345,
                longitude: 12345,
            }
        };
        console.log(data);
        this.activitiesService.submitNewActivity(data);

        this.closeForm();
    }

    checkCheckedBoxes() {
        const checkedUsers: UserDomain[] = [];

        this.userDomains.forEach(user => {
            const element = document.getElementById(user.userId.toString()) as HTMLInputElement;
            if (element.checked) {
                checkedUsers.push(user);
            }
        });
        return checkedUsers;
    }

    getAllUsers() {
        // @TODO
    }
}
