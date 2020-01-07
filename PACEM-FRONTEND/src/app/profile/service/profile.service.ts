import {Injectable, ViewChild} from '@angular/core';
import {SocketClientService} from '../../service/socket-client.service';
import {Hobby, ProfileDomain} from '../../models/domain-model/profile.domain';
import {GlobalStorageService} from '../../service/global-storage.service';

@Injectable()
export class ProfileService {
    constructor(private socketClientService: SocketClientService, private globalStorageService: GlobalStorageService) {
    }

    public getProfileInfo(): Promise<ProfileDomain> {
        return new Promise((resolve, reject) => {

            let profileDomain: ProfileDomain;
            this.globalStorageService.getFirstname().then((firstname) => {
                this.globalStorageService.getLastname().then((lastname) => {
                    this.globalStorageService.getStatus().then((status) => {
                        this.globalStorageService.getUserId().then((userId) => {
                            this.globalStorageService.getToken().then((token) => {
                                const profileModel = {
                                    jwtToken: token,
                                    data: {
                                        userId
                                    }
                                };

                                this.socketClientService.socket.emit('getProfileData', JSON.stringify(profileModel));

                                this.socketClientService.socket.on('invalid-request', (data) => {
                                    this.socketClientService.socket.removeListener('invalid-request');
                                    this.socketClientService.socket.removeListener('profile-data');
                                    reject(data);
                                });

                                const hobbies: Hobby[] = [];
                                this.socketClientService.socket.on('profile-data', (data) => {
                                    data.hobbies.forEach((hobby) => hobbies.push({name: hobby.name}));
                                    this.socketClientService.socket.removeListener('invalid-jwt');
                                    this.socketClientService.socket.removeListener('profile-data');
                                    profileDomain = {
                                        firstname,
                                        lastname,
                                        backgroundImage: data.backgroundImage,
                                        profilePicture: data.profileImage,
                                        aboutMe: data.aboutMe,
                                        status,
                                        hobbies
                                    };

                                    resolve(profileDomain);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    public setProfileImage(value: any) {
        this.globalStorageService.getToken().then((token) => {
            const profileModel = {
                jwtToken: token,
                data: {
                    image: value
                }
            };
            this.socketClientService.socket.emit('setProfileImage', JSON.stringify(profileModel));
        });
    }

    public setProfileBackgroundImage(value: any) {
        this.globalStorageService.getToken().then((token) => {
            const profileModel = {
                jwtToken: token,
                data: {
                    image: value
                }
            };
            this.socketClientService.socket.emit('setProfileBackgroundImage', JSON.stringify(profileModel));
        });
    }

    public setProfileStatus(value: any) {
        this.globalStorageService.getToken().then((token) => {
            const profileModel = {
                jwtToken: token,
                data: {
                    status: value
                }
            };
            this.globalStorageService.setStatus(value).then(() => {
                this.socketClientService.socket.emit('setUserProfileStatus', JSON.stringify(profileModel));
            });
        });
    }
}
