import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {Socket} from 'ngx-socket-io';
import {Subscription} from 'rxjs';
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
            this.authenticationService.loginUser(email, password).then((data) => {
                this.authenticationService.setUserId(data.UserId);
                this.authenticationService.setUserToken(data.JwtToken);
                this.authenticationService.setFirstName(data.FirstName);
                this.authenticationService.setLastName(data.LastName);
                this.authenticationService.setEmailAddress(data.EmailAddress);
                this.authenticationService.setStatus(data.Status);
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
