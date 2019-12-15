import {Component} from '@angular/core';
import {ActivitiesService} from './service/activities.service';

@Component({
    selector: 'app-activities',
    templateUrl: 'activities.page.html',
    styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {

    constructor(private activitiesService: ActivitiesService) {

    }

}
