import {Injectable} from '@angular/core';
import {SocketClientService} from '../../service/socket-client.service';
import {Hobby, ProfileDomain} from '../../models/domain-model/profile.domain';
import {GlobalStorageService} from '../../service/global-storage.service';

@Injectable()
export class ProfileService {
    constructor(private socketClientService: SocketClientService, private globalStorageService: GlobalStorageService) {
    }

    public getProfileInfo(): Promise<ProfileDomain> {
        return new Promise((resolve, reject) => {

            const hobbies: Hobby[] = [{name: 'vissen'}, {name: 'buiten spelen'}];
            let profileDomain: ProfileDomain;
            this.globalStorageService.getFirstname().then((firstname) => {
                console.log(firstname);
                this.globalStorageService.getLastname().then((lastname) => {
                    console.log(lastname);
                    this.globalStorageService.getStatus().then((status) => {
                        console.log(status);
                        profileDomain = {
                            firstname,
                            lastname,
                            backgroundImage: '',
                            profilePicture: '',
                            aboutMe: '',
                            status,
                            hobbies
                        };

                        resolve(profileDomain);
                    });
                });
            }).catch((error) => {
                console.log(error);
                console.log('kapoit');
            });
        });
    }
}
