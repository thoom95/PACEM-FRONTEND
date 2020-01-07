import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.checkIfUserIsLoggedAndRedirect();
    }

    public loginUser(email: string, password: string) {
        return new Promise((resolve, reject) => {
            console.log('data');
            this.authenticationService.loginUserWithCreds(email, password).then((data) => {
                console.log(data);
                this.authenticationService.setUserData(data).then(() => {
                    resolve();
                }).catch(() => {

                    console.log('duurtlang');
                    reject();
                });
            }).catch((error) => {
                console.log('duurtlang2');
                reject(error);
            });
        });
    }

    public checkIfUserIsLoggedAndRedirect() {
        this.authenticationService.globalStorageService.isLoggedIn().then((Jwt) => {
            this.authenticationService.loginUserWithJwt(Jwt).then((data) => {
                this.authenticationService.setUserData(data).then(() => {
                    this.router.navigateByUrl('/tabs/activities');
                }).catch(() => {

                });
            }).catch(() => {
                this.authenticationService.globalStorageService.signUserOut().then(() => {
                    this.router.navigateByUrl('/login');
                }).catch(() => {

                });
            });
        }).catch(() => {
            this.authenticationService.globalStorageService.signUserOut().then(() => {
                this.router.navigateByUrl('/login');
            }).catch(() => {

            });
        });
    }
}
