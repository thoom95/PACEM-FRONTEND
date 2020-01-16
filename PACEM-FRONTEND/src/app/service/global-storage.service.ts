import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

export class MockingStorage {
    set(key, data) {
        return new Promise((resolve, reject) => {
            window.localStorage.setItem(key, data);
            resolve();
        });
    }

    ready() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    get(key): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(window.localStorage.getItem(key).toString());
        });
    }

    remove(key): Promise<string> {
        return new Promise((resolve, reject) => {
            window.localStorage.removeItem(key);
            resolve();
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class GlobalStorageService {

    constructor(private storage: MockingStorage) {

    }

    public setUserToken(token: string) {
        return new Promise((resolve, reject) => {
            // this.storage.ready().then(() => {
            this.storage.set('token', token).then(() => {
                console.log(token);
                console.log('gelukt!');
                resolve();
            }).catch(() => {
                console.log('niet-gelukt!');
                reject();
            });
            // }).catch(() => {
            //     console.log('Geen token');
            //     reject();
            // });
        });
    }

    public setUserId(userId: number) {
        return new Promise((resolve, reject) => {
            //    this.storage.ready().then(() => {
            this.storage.set('userId', userId).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
            // }).catch(() => {
            //     console.log('Geen userId');
            //     reject();
            // });
        });
    }

    public setStatus(status: string) {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.set('status', status).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen status');
                resolve();
            });
        });
    }

    public setFirstName(firstname: string) {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.set('firstname', firstname).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('geen firstName');
                reject();
            });
        });
    }

    public setLastName(lastname: string) {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.set('lastname', lastname).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen lastName');
                reject();
            });
        });
    }

    public setEmailAddress(emailAddress: string) {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.set('emailAddress', emailAddress).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen emailAddress');
                reject();
            });
        });
    }

    public getFirstname(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('firstname').then((firstname) => {
                    resolve(firstname);
                }).catch((error) => {
                    reject(error);
                });
            }).catch(() => {
                console.log('Geen firstName');
                reject();
            });
        });
    }

    public getLastname(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('lastname').then((lastname) => {
                    if (!lastname) {
                        reject();
                    }

                    resolve(lastname);
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen lastName');
                reject();
            });
        });
    }

    public getStatus(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('status').then((status) => {
                    if (!status) {
                        reject();
                    }

                    resolve(status);
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen status');
                reject();
            });
        });
    }

    public getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('token').then((status) => {
                    if (!status) {
                        reject();
                    }

                    resolve(status);
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen token');
                reject();
            });
        });
    }

    public getUserId(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('userId').then((status) => {
                    if (!status) {
                        reject();
                    }

                    resolve(status);
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Geen userId');
                reject();
            });
        });
    }

    public isLoggedIn(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.getToken().then((token) => {
                    console.log('kalemoer' + token);
                    if (!token) {
                        console.log('no-token1');
                        reject();
                    }

                    resolve(token);
                }).catch(() => {
                    console.log('no-token');
                    reject();
                });
            }).catch(() => {
                console.log('Niet ingelogd');
                reject();
            });
        });
    }

    public signUserOut(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.remove('token').then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                console.log('Kan token niet verwijderen');
                reject();
            });
        });
    }
}
