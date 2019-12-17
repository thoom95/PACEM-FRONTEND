import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {UserDomain} from '../../../models/domain-model/user.domain';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.checkIfUserIsLoggedAndRedirect();
    }

    public loginUser(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.authenticationService.loginUserWithCreds(email, password).then((data) => {
                this.authenticationService.setUserData(data);
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public checkIfUserIsLoggedAndRedirect() {
        this.authenticationService.globalStorageService.isLoggedIn().then((Jwt) => {
            this.authenticationService.loginUserWithJwt(Jwt).then((data) => {
                this.authenticationService.setUserData(data);
                this.router.navigateByUrl('/');
            }).catch(() => {
                this.authenticationService.globalStorageService.signUserOut();
                this.router.navigateByUrl('/login');
            });
        }).catch(() => {
            this.authenticationService.globalStorageService.signUserOut();
            this.router.navigateByUrl('/login');
        });
    }
}
