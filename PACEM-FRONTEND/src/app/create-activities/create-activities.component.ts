import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDomain} from "../models/domain-model/user.domain";

@Component({
    selector: 'app-create-activities',
    templateUrl: './create-activities.component.html',
    styleUrls: ['./create-activities.component.scss'],
})
export class CreateActivitiesComponent {
    public activityForm: FormGroup;
    public users: UserDomain[] = [];

    constructor(public modalController: ModalController, public formBuilder: FormBuilder) {
        this.activityForm = formBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            maxParticipants: ['', Validators.compose([Validators.required])],
            location: ['', Validators.compose([Validators.required])],
            startTime: ['', Validators.compose([Validators.required])],
            endTime: ['', Validators.compose([Validators.required])]
        });

        this.users.push({
            userId: 1,
            jwtToken: "",
            emailAddress: "",
            status: "",
            firstName: "Bart",
            lastName: "Jan"
        });
    }

    public createActivity(form) {

    }
}
