import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDomain} from '../models/domain-model/user.domain';
import {CreateActivitiesService} from './service/create-activities.service';
import {IonicSelectableComponent} from "ionic-selectable";

@Component({
    selector: 'app-create-activities',
    templateUrl: './create-activities.component.html',
    styleUrls: ['./create-activities.component.scss'],
})
export class CreateActivitiesComponent {
    public activityForm: FormGroup;
    public selectedUsers: Colleague[] = [];
    public users: Colleague[] = [];
    public fromDate = new Date();

    constructor(public modalController: ModalController, public formBuilder: FormBuilder,
                private createActivitiesService: CreateActivitiesService) {

        this.createActivitiesService.getUsers().then((users) => {
            this.users = users.sort((a, b) => {
                return a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0
            }).map((user) => {
                return {
                    colleagueId: user.userId,
                    name: user.firstName + ' ' + user.lastName
                };
            });
        });

        this.activityForm = formBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            maxParticipants: ['', Validators.compose([Validators.required])],
            location: ['', Validators.compose([Validators.required])],
            startTime: ['', Validators.compose([Validators.required])],
            endTime: ['', Validators.compose([Validators.required])],
            colleagues: ['', Validators.compose([Validators.min(0)])]
        });
    }

    public createActivity(form) {
        const formData: NewActivity = form.value;
        this.createActivitiesService.addActivity(formData);
        console.log(formData);
        this.modalController.dismiss();
    }

    closeModal() {
        this.modalController.dismiss();
    }
}

export interface NewActivity {
    name: string;
    maxParticipants: number;
    location: string;
    startTime: string;
    endTime: string;
    colleagues?: Colleague[];
}

export interface Colleague {
    colleagueId: number;
    name: string;
}
