import {Component} from '@angular/core';
import {ActivitiesService} from './service/activities.service';
import {ActivityDomain, ActivityLocationDomain, ActivityParticipantsDomain} from '../models/domain-model/activity.domain';

@Component({
    selector: 'app-activities',
    templateUrl: 'activities.page.html',
    styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {

    private activityDomains: ActivityDomain[] = [];

    constructor(private activitiesService: ActivitiesService) {
        const activityLocationDomain: ActivityLocationDomain = {
            startTime: '13:00',
            endTime: '14:00',
            startLocation: 'ingang',
            locationInfo: 'Kapittelweg 44'
        };

        let participants: ActivityParticipantsDomain[] = [];

        let activityParticipantsDomain: ActivityParticipantsDomain = {
            userId: 9,
            FirstName: 'Devran',
            isMe: false,
            LastName: 'Alper'
        };

        participants.push(activityParticipantsDomain);

        activityParticipantsDomain = {
            userId: 4,
            FirstName: 'Camiel',
            isMe: false,
            LastName: 'Anjer'
        };

        participants.push(activityParticipantsDomain);

        activityParticipantsDomain = {
            userId: 3,
            FirstName: 'Durian',
            isMe: false,
            LastName: 'Miepert'
        };

        participants.push(activityParticipantsDomain);
        let activityDomain: ActivityDomain = {
            title: 'Rondje lopen',
            location: activityLocationDomain,
            participating: false,
            participants
        };

        this.activityDomains.push(activityDomain);


        participants = [];

        activityParticipantsDomain = {
            userId: 9,
            FirstName: 'Devran',
            isMe: true,
            LastName: 'Alper'
        };

        participants.push(activityParticipantsDomain);

        activityParticipantsDomain = {
            userId: 4,
            FirstName: 'Camiel',
            isMe: false,
            LastName: 'Anjer'
        };

        participants.push(activityParticipantsDomain);

        activityParticipantsDomain = {
            userId: 3,
            isMe: false,
            FirstName: 'Durian',
            LastName: 'Miepert'
        };

        participants.push(activityParticipantsDomain);
        activityDomain = {
            title: 'Koffie Corner',
            participating: true,
            participants
        };

        this.activityDomains.push(activityDomain);
    }

}



