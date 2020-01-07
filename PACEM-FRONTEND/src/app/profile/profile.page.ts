import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Hobby, ProfileDomain} from '../models/domain-model/profile.domain';
import {ProfileService} from './service/profile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {IonInput} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    private profileDomain: ProfileDomain;
    public editStatus: boolean;

    constructor(private profileService: ProfileService, private changeDetectorRef: ChangeDetectorRef, private domSen: DomSanitizer) {
        this.profileService.getProfileInfo().then((profileDomain) => {
            this.profileDomain = profileDomain;
            console.log(profileDomain);
            this.changeDetectorRef.detectChanges();
        });
    }

    @ViewChild('statusField', {static: true}) statusField: IonInput;
    editAboutMe: boolean;

    public saveStatus($event: any) {
        const status = $event.target.value;
        if (status && status.length > 1) {
            this.profileService.setProfileStatus($event.target.value);
            this.profileService.getProfileInfo().then((profileDomain) => {
                this.profileDomain = profileDomain;
                this.changeDetectorRef.detectChanges();
                this.editStatus = false;
                this.statusField.value = '';
            });
        }
    }

    enableStatusField() {
        this.editStatus = true;

        this.changeDetectorRef.detectChanges();
        this.statusField.setFocus();
    }

    saveAboutMe($event: any) {

    }
}
