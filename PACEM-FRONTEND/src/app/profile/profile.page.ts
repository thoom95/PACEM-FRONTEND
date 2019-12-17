import {ChangeDetectorRef, Component} from '@angular/core';
import {Hobby, ProfileDomain} from '../models/domain-model/profile.domain';
import {ProfileService} from './service/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    private profileDomain: ProfileDomain;

    constructor(private profileService: ProfileService, private changeDetectorRef: ChangeDetectorRef) {
        this.profileService.getProfileInfo().then((profileDomain) => {
            this.profileDomain = profileDomain;
            this.changeDetectorRef.detectChanges();
        }).catch((error) => {
            console.log(error);
        });
    }
}
