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
    onError = false;

    constructor(public registerService: RegisterService, public formBuilder: FormBuilder, public router: Router) {
        this.registerForm = formBuilder.group({
            firstname: ['', Validators.compose([Validators.required, Validators.required])],
            lastname: ['', Validators.compose([Validators.required, Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
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
        const password = 'hantest';

        if (email && password) {
            this.registerService.registerUser(email, firstname, lastname, password).then(() => {
                this.router.navigateByUrl('/');
            }).catch((error) => {
                // @Todo add proper error logging and relay it to the user.
                console.log(error);
                this.onError = true;
                // could not register
            });
        }
    }
}
