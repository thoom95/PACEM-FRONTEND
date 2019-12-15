import {Component} from '@angular/core';
import {LoginService} from './service/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public loginForm: FormGroup;
    public apiError = '';

    constructor(private router: Router, public loginService: LoginService, public formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    }

    public login(form): void {
        const email = form.value.email;
        const password = form.value.password;

        if (email && password) {
            this.loginService.loginUser(email, password).then(() => {
                this.router.navigateByUrl('/');
            }).catch((error) => {
                this.apiError = error;
                console.log(error);
            });
        }
    }
}
