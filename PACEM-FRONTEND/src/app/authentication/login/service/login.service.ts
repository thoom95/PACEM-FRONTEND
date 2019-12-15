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
            this.authenticationService.loginUser(email, password).then((response) => {
                this.router.navigateByUrl('/');
            }).catch((error) => {
                reject(error);
            });
        });
    }

    private checkIfUserIsLoggedAndRedirect() {
        this.authenticationService.isLoggedIn().then(() => {
            this.router.navigateByUrl('/');
        }).catch(() => {
            // User is not signed in.
        });
    }
}
