import {Component} from '@angular/core';
import {Hobby, ProfileDomain} from '../models/domain-model/profile.domain';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {

    constructor() {
        const hobbies: Hobby[] = [{name: 'vissen'}, {name: 'buiten spelen'}];
        const profileDomain: ProfileDomain = {
            firstname: '',
            lastname: '',
            backgroundImage: '',
            profilePicture: '',
            aboutMe: '',
            status: '',
            hobbies
        };
    }
}
