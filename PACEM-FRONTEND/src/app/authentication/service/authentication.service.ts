import {environment} from '../../../environments/environment';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {UserDomain} from '../../models/domain-model/user.domain';
import {Subscription} from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private invalidRequestSub: Subscription;
    private authenticated: Subscription;

    constructor(private storage: Storage, private socket: Socket) {
        this.socket.connect();
    }

    public loginUser(email: string, password: string): Promise<UserDomain> {
        return new Promise((resolve, reject) => {
            const loginModel = {
                data: {
                    email,
                    password
                }
            };

            this.socket.emit('authWithCreds', JSON.stringify(loginModel));
            this.invalidRequestSub = this.socket.fromEvent('invalid-request').subscribe((data) => {
                this.invalidRequestSub.unsubscribe();
                this.authenticated.unsubscribe();

                reject(data);
            });

            this.authenticated = this.socket.fromEvent('authenticated').subscribe((data: UserDomain) => {
                resolve(data);
            });
        });
    }

    public registerUser(email: string, name: string, password: string, repeatPassword: string) {
        return new Promise((resolve, reject) => {
            resolve();
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
                this.storage.remove('name').then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                reject();
            });
        });
    }
}
