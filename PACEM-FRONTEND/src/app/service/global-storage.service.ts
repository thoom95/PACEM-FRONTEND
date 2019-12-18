import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class GlobalStorageService {

    constructor(private storage: Storage) {

    }

    public setUserToken(token: string) {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.set('token', token).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public setUserId(userId: number) {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.set('userId', userId).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public setStatus(status: string) {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.set('status', status).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public setFirstName(firstname: string) {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.set('firstname', firstname).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public setLastName(lastname: string) {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.set('lastname', lastname).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public setEmailAddress(emailAddress: string) {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.set('emailAddress', emailAddress).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public getFirstname(): Promise<string> {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.get('firstname').then((firstname) => {
                    resolve(firstname);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }

    public getLastname(): Promise<string> {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.get('lastname').then((lastname) => {
                    if (!lastname) {
                        reject();
                    }

                    resolve(lastname);
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public getStatus(): Promise<string> {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.get('status').then((status) => {
                    if (!status) {
                        reject();
                    }

                    resolve(status);
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public getToken(): Promise<string> {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.get('token').then((status) => {
                    if (!status) {
                        reject();
                    }

                    resolve(status);
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public getUserId(): Promise<number> {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.get('userId').then((status) => {
                    if (!status) {
                        reject();
                    }

                    resolve(status);
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public isLoggedIn(): Promise<string> {
        return this.storage.ready().then(() => {
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
        });
    }

    public signUserOut(): Promise<boolean> {
        return this.storage.ready().then(() => {
            return new Promise((resolve, reject) => {
                this.storage.remove('token').then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        });
    }
}
