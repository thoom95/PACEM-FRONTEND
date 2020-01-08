import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalStorageService} from '../service/global-storage.service';
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage {

    email: string;

    constructor(private router: Router,
                private globalStorageService: GlobalStorageService,
                public toastController: ToastController) {
    }

    logout() {
        this.router.navigateByUrl('/logout');
    }

    sendEmail() {
        console.log(this.email);
        if (this.email) {
            const link = 'mailto:' + this.email +
                '?subject=Uitnodiging Pacem' +
                '&body=Hallo, Je bent uitgenodigd voor de Pacem app.' +
                ' Je kunt hem via deze link bereiken: https://pacem-frontend.firebaseapp.com';

            window.location.href = link;
        }
        this.email = '';
    }

     genical() {
        this.globalStorageService.getUserId().then((userId) => {
            this.copyMessage('http://127.0.0.1/getCalendar?userId=' + userId);
            this.toastController.create({
                message: 'De ical-link is gekopieerd in uw clipboard.',
                duration: 2000
            }).then((toast) => {
                toast.present();
            });
        }).catch(() => {

        });
    }

    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
