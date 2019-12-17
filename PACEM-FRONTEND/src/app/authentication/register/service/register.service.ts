import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private router: Router, private authenticationService: AuthenticationService) {

    }

    public registerUser(email: string, firstname: string, lastname: string, password: string) {
        return new Promise((resolve, reject) => {
            this.authenticationService.registerUser(email, firstname, lastname,
                password).then((data) => {
                this.authenticationService.setUserData(data);
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
