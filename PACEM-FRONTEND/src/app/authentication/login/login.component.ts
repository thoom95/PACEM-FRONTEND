import {Component} from '@angular/core';
import {LoginService} from './service/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NoConnectionService} from '../../no-connection/service/no-connection.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public loginForm: FormGroup;
    public apiError = '';
    onError = false;

    constructor(private router: Router, private noConnectionService: NoConnectionService,
                public loginService: LoginService, public formBuilder: FormBuilder) {
        this.loginService.checkIfUserIsLoggedAndRedirect();
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    }

    ionViewDidEnter() {
        this.noConnectionService.checkForConnectionAndRedirect();
    }

    public login(form): void {
        const email = form.value.email;
        const password = form.value.password;

        if (email && password) {
            this.loginService.loginUser(email, password).then(() => {
                this.router.navigateByUrl('/tabs/activities');
            }).catch((error) => {
                this.apiError = error;
                this.onError = true;
                console.log(error);
            });
        }
    }
}
