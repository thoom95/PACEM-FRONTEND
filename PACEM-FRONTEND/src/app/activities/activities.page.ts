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
            activityId: 2,
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
            activityId: 4,
            title: 'Koffie Corner',
            participating: true,
            participants
        };

        this.activityDomains.push(activityDomain);

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
        console.log(activityId);
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



