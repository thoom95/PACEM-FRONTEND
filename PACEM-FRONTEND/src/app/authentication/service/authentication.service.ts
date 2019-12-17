import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {UserDomain} from '../../models/domain-model/user.domain';
import {Subscription} from 'rxjs';
import {SocketClientService} from '../../service/socket-client.service';
import {GlobalStorageService} from '../../service/global-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private invalidRequestSub: Subscription;
    private invalidRequestJwtSub: Subscription;
    private invalidRequestRegSub: Subscription;
    private authenticated: Subscription;

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


    public setUserData(data: UserDomain) {
        this.globalStorageService.setUserId(data.userId);
        this.globalStorageService.setUserToken(data.jwtToken);
        this.globalStorageService.setFirstName(data.firstname);
        this.globalStorageService.setLastName(data.lastname);
        this.globalStorageService.setEmailAddress(data.emailaddress);
        this.globalStorageService.setStatus(data.status);
    }
}
