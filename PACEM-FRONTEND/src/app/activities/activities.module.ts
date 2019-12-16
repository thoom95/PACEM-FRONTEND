import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ActivitiesPage} from './activities.page';
import {ActivityComponent} from '../components/activity-component/activity.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ActivitiesPage}]),
    ],
    declarations: [ActivitiesPage, ActivityComponent]
})
export class ActivitiesModule {}
