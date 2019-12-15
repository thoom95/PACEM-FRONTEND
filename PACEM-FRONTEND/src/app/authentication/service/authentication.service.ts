import {environment} from '../../../environments/environment';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private storage: Storage) {

    }

    /*
        private axiosInstance = axios.create({
            baseURL: environment.apiEndPointBase,
            headers: {
                'Content-Type': environment.apiClientContentType,
            }
        });
    */
    public registerUser(email: string, name: string,
                        password: string, repeatPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const apiBody = new FormData();

            apiBody.set('emailAddress', email);
            apiBody.set('name', name);
            apiBody.set('password', password);
            apiBody.set('repeatPassword', repeatPassword);
            /*
                        this.axiosInstance.post(environment.apiRegisterEndpoint, apiBody).then(
                            response => {
                                const token = response.data.token;
                                const nameOfUser = response.data.name;
                                if (!token || !nameOfUser || !email) {
                                    reject();
                                }

                                this.setUserToken(token).catch(() => {
                                    reject();
                                });

                                this.setUserName(name).catch(() => {
                                    reject();
                                });

                                this.setEmailAddress(email).catch(() => {
                                    reject();
                                });

                                resolve(response);
                            },
                            error => {
                                reject(error.response.status);
                            }
                        ); */
            resolve();
        });
    }

    public loginUser(email: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const apiBody = new FormData();
            apiBody.set('emailAddress', email);
            apiBody.set('password', password);
            /*
                        this.axiosInstance.post(environment.apiLoginEndpoint, apiBody).then(
                            response => {
                                const token = response.data.token;
                                const name = response.data.name;
                                if (!token || !name || !email) {
                                    reject();
                                }

                                this.setUserToken(token).catch(() => {
                                    reject();
                                });

                                this.setUserName(name).catch(() => {
                                    reject();
                                });

                                this.setEmailAddress(email).catch(() => {
                                    reject();
                                });

                                resolve(response);
                            },
                            error => {
                                reject(error.response.status);
                            }
                        );*/
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

    public setEmailAddress(emailAddress: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('emailAddress', emailAddress).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    public setUserName(name: string) {
        return new Promise((resolve, reject) => {
            this.storage.set('name', name).then(() => {
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

    public getUsername(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('name').then((name) => {
                if (!name) {
                    reject();
                }

                resolve(name);
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
