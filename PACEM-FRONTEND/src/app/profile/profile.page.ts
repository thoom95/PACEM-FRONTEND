import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Hobby, ProfileDomain } from '../models/domain-model/profile.domain';
import { ProfileService } from './service/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    private profileDomain: ProfileDomain;
    public editEnabled = false;
    public editStatus: boolean;
    public usersOwnProfile: boolean;
    userId: any;

    constructor(private profileService: ProfileService,
        private changeDetectorRef: ChangeDetectorRef,
        private domSen: DomSanitizer,
        public route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.userId = params['item'];
            console.log(this.userId);
            if (this.userId === '') {
                console.log('is \'\'');
                this.usersOwnProfile = true;
                this.profileService.getProfileInfo().then((profileDomain) => {
                    this.profileDomain = profileDomain;

                    this.changeDetectorRef.detectChanges();
                });
            } else {
                this.usersOwnProfile = false;
                this.profileService.getProfileInfo().then((profileDomain) => {
                    this.profileDomain = profileDomain;

                    this.changeDetectorRef.detectChanges();
                });
                //laad profile van de userId
            }

        });
    }

    @ViewChild('statusField', { static: true }) statusField: IonInput;
    @ViewChild('aboutMeField', { static: true }) aboutMeField: IonInput;
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

    saveAboutMe($event: any) {
        this.editAboutMe = false;
        const aboutMe = $event.target.value;
        if (aboutMe && aboutMe.length > 1) {
            this.profileService.setProfileAboutMe($event.target.value);
            this.profileService.getProfileInfo().then((profileDomain) => {
                this.profileDomain = profileDomain;
                this.changeDetectorRef.detectChanges();
                this.aboutMeField.value = '';
            });
        }
    }

    uploadProfile(imageInput: FileList) {
        if (imageInput.length > 0 && imageInput.length === 1) {
            const reader = new FileReader();

            reader.readAsDataURL(imageInput[0]);
            reader.onload = (_) => {
                this.profileService.setProfileImage(reader.result);
                setInterval(() => {
                    this.profileService.getProfileInfo().then((profileDomain) => {
                        this.profileDomain = profileDomain;
                        this.changeDetectorRef.detectChanges();
                    });
                }, 500);
            };
        }
    }

    uploadBackgroundImage(imageInput: FileList) {
        if (imageInput.length > 0 && imageInput.length === 1) {
            const reader = new FileReader();

            reader.readAsDataURL(imageInput[0]);
            reader.onload = (_) => {
                this.profileService.setProfileBackgroundImage(reader.result);
                setInterval(() => {
                    this.profileService.getProfileInfo().then((profileDomain) => {
                        this.profileDomain = profileDomain;
                        this.changeDetectorRef.detectChanges();
                    });
                }, 500);
            };
        }
    }

    editAboutMeClicked() {
        this.editAboutMe = true;
        this.aboutMeField.setFocus();
    }

    editStatusClicked() {
        this.editStatus = true;
        this.statusField.setFocus();
    }
}
