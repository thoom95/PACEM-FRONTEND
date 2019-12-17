import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {SocketClientService} from './socket-client.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalStorageService {

    constructor(private storage: Storage) {

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
}
