import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.checkIfUserIsLoggedAndRedirect();
    }

    public registerUser(email: string, name: string, password: string, repeatPassword: string) {
        return new Promise((resolve, reject) => {
            this.authenticationService.registerUser(email, name,
                password, repeatPassword).then((data) => {
                resolve(data);
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
