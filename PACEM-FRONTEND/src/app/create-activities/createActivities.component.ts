import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-createActivities',
    templateUrl: './createActivities.component.html',
    styleUrls: ['./createActivities.component.scss'],
})
export class CreateActivitiesComponent {

    private showInviteDiv = false;


    constructor( public modalController: ModalController) {

    }




    closeForm() {
        // document.getElementById('myForm').style.display = 'none';
    }
}
