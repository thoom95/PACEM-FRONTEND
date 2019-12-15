import {Component} from '@angular/core';
import {RegisterService} from './service/register.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    public registerForm: FormGroup;

    constructor(public registerService: RegisterService, public formBuilder: FormBuilder, public router: Router) {
        this.registerForm = formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6),
                Validators.maxLength(12),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
            repeatPassword: ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'repeatPassword')});
    }

    private matchingPasswords(passwordKey: string, repeatPassword: string) {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[repeatPassword];

            if (password.value === confirmPassword.value) {
            } else {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    public register(form): void {
        const email = form.value.email;
        const name = form.value.name;
        const password = form.value.password;
        const repeatPassword = form.value.repeatPassword;

        if (email && password) {
            this.registerService.registerUser(email, name, password, repeatPassword).then(() => {
                this.router.navigateByUrl('/');
            }).catch((error) => {
                // could not register
            });
        }
    }
}
