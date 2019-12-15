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
            firstname: ['', Validators.compose([Validators.required, Validators.required])],
            lastname: ['', Validators.compose([Validators.required, Validators.required])],
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
        const firstname = form.value.firstname;
        const lastname = form.value.lastname;
        const password = form.value.password;

        if (email && password) {
            this.registerService.registerUser(email, firstname, lastname, password).then(() => {
                this.router.navigateByUrl('/');
            }).catch((error) => {
                // @Todo add proper error logging and relay it to the user.
                console.log(error);
                // could not register
            });
        }
    }
}
