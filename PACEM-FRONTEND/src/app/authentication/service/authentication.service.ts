import {Injectable} from '@angular/core';
import {UserDomain} from '../../models/domain-model/user.domain';
import {SocketClientService} from '../../service/socket-client.service';
import {GlobalStorageService} from '../../service/global-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(public globalStorageService: GlobalStorageService, private socketClientService: SocketClientService) {

    }

    public loginUserWithJwt(jwtToken: string): Promise<UserDomain> {
        return new Promise((resolve, reject) => {
            const loginModel = {
                data: {
                    jwtToken
                }
            };

            this.socketClientService.socket.emit('authWithJwt', JSON.stringify(loginModel));

            this.socketClientService.socket.on('invalid-jwt', (data) => {
                this.socketClientService.socket.removeListener('invalid-jwt');
                this.socketClientService.socket.removeListener('authenticated');
                reject(data);
            });

            this.socketClientService.socket.on('authenticated', (data: UserDomain) => {
                this.socketClientService.socket.removeListener('invalid-jwt');
                this.socketClientService.socket.removeListener('authenticated');
                resolve(data);
            });
        });
    }

    public loginUserWithCreds(email: string, password: string): Promise<UserDomain> {
        return new Promise((resolve, reject) => {
            const loginModel = {
                data: {
                    email,
                    password
                }
            };

            this.socketClientService.socket.emit('authWithCreds', JSON.stringify(loginModel));

            this.socketClientService.socket.on('invalid-request', (data) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('authenticated');
                reject(data);
            });

            this.socketClientService.socket.on('authenticated', (data: UserDomain) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('authenticated');

                resolve(data);
            });
        });
    }

    public registerUser(email: string, firstname: string, lastname: string, password: string): Promise<UserDomain> {
        return new Promise((resolve, reject) => {
            const loginModel = {
                data: {
                    emailaddress: email,
                    firstname,
                    lastname,
                    password
                }
            };

            this.socketClientService.socket.emit('registerUser', JSON.stringify(loginModel));

            this.socketClientService.socket.on('invalid-request', (data) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('invalid-reg');
                this.socketClientService.socket.removeListener('authenticated');
                reject(data);
            });

            this.socketClientService.socket.on('invalid-reg', (data) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('invalid-reg');
                this.socketClientService.socket.removeListener('authenticated');
                reject(data);
            });

            this.socketClientService.socket.on('authenticated', (data) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('invalid-reg');
                this.socketClientService.socket.removeListener('authenticated');

                resolve(data);
            });
        });
    }

    public setUserData(data: UserDomain): Promise<boolean> {
        return new Promise((resolve, reject) => {
            //     Promise.all([
            //                 this.globalStorageService.setUserId(data.userId),
            //                 this.globalStorageService.setUserToken(data.jwtToken),
            //                 this.globalStorageService.setFirstName(data.firstName),
            //                 this.globalStorageService.setLastName(data.lastName),
            //                 this.globalStorageService.setEmailAddress(data.emailAddress),
            //                 this.globalStorageService.setStatus(data.status)
            //         ]).then(() => {
            //             resolve(true);
            //     }).catch(() => {
            //         reject();
            //     });
            // });

            // if (!data.status) {
            //     data.status = ' ';
            // }


            this.globalStorageService.setUserId(data.userId).then(() => {

                this.globalStorageService.setUserToken(data.jwtToken).then(() => {

                    this.globalStorageService.setFirstName(data.firstName).then(() => {

                        this.globalStorageService.setLastName(data.lastName).then(() => {

                            this.globalStorageService.setEmailAddress(data.emailAddress).then(() => {

                                this.globalStorageService.setStatus(data.status).then(() => {
                                    resolve(true);
                                }).catch(() => {
                                    console.log("error: setStatus");
                                    reject();
                                })

                            }).catch(() => {
                                console.log('error: setEmailAddress');
                                reject();
                            });

                        }).catch(() => {
                            console.log('error: setLastName');
                            reject();
                        });

                    }).catch(() => {
                        console.log('error: setFirstName');
                        reject();
                    });

                }).catch(() => {
                    console.log('error: setUserToken');
                    reject();
                });

            }).catch(() => {
                console.log('error: setUserId');
                reject();
            });
        });
    }
}
