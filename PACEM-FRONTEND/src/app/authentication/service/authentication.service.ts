import {environment} from '../../../environments/environment';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {UserDomain} from '../../models/domain-model/user.domain';
import {Subscription} from 'rxjs';
import {SocketClientService} from '../../service/socket-client.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private invalidRequestSub: Subscription;
    private invalidRequestJwtSub: Subscription;
    private invalidRequestRegSub: Subscription;
    private authenticated: Subscription;

    constructor(private storage: Storage, private socketClientService: SocketClientService) {

    }

    public loginUserWithJwt(jwtToken: string): Promise<UserDomain> {
        return new Promise((resolve, reject) => {
            const loginModel = {
                data: {
                    jwtToken
                }
            };

            this.socketClientService.socket.emit('authWithJwt', JSON.stringify(loginModel));
            this.invalidRequestJwtSub = this.socketClientService.socket.fromEvent('invalid-jwt').subscribe((data) => {
                this.invalidRequestJwtSub.unsubscribe();
                this.authenticated.unsubscribe();

                reject(data);
            });

            this.authenticated = this.socketClientService.socket.fromEvent('authenticated').subscribe((data: UserDomain) => {
                this.invalidRequestJwtSub.unsubscribe();
                this.authenticated.unsubscribe();
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
            this.invalidRequestSub = this.socketClientService.socket.fromEvent('invalid-request').subscribe((data) => {
                this.invalidRequestSub.unsubscribe();
                this.authenticated.unsubscribe();

                reject(data);
            });

            this.authenticated = this.socketClientService.socket.fromEvent('authenticated').subscribe((data: UserDomain) => {
                this.invalidRequestSub.unsubscribe();
                this.authenticated.unsubscribe();
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
            this.invalidRequestSub = this.socketClientService.socket.fromEvent('invalid-request').subscribe((data) => {
                this.invalidRequestSub.unsubscribe();
                this.invalidRequestRegSub.unsubscribe();
                this.authenticated.unsubscribe();

                reject(data);
            });

            this.invalidRequestRegSub = this.socketClientService.socket.fromEvent('invalid-reg').subscribe((data) => {
                this.invalidRequestSub.unsubscribe();
                this.invalidRequestRegSub.unsubscribe();
                this.authenticated.unsubscribe();

                reject(data);
            });

            this.authenticated = this.socketClientService.socket.fromEvent('authenticated').subscribe((data: UserDomain) => {
                this.invalidRequestSub.unsubscribe();
                this.invalidRequestRegSub.unsubscribe();
                this.authenticated.unsubscribe();
                resolve(data);
            });
        });
    }

    public setUserToken(token: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('token', token).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setUserId(userId: number) {
        return new Promise((resolve, reject) => {
            this.storage.set('userId', userId).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setStatus(status: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('status', status).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setFirstName(firstname: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('firstname', firstname).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setLastName(lastname: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('lastname', lastname).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setEmailAddress(emailAddress: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('emailAddress', emailAddress).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public isLoggedIn(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {
                if (!token) {
                    reject();
                }

                resolve(token);
            }).catch(() => {
                reject();
            });
        });
    }

    public signUserOut(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.storage.remove('token').then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setUserData(data: UserDomain) {
        this.setUserId(data.userId);
        this.setUserToken(data.jwtToken);
        this.setFirstName(data.firstname);
        this.setLastName(data.lastname);
        this.setEmailAddress(data.emailaddress);
        this.setStatus(data.status);
    }
}
