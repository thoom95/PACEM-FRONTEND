import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvitesPage } from './invites.page';
import {InviteComponent} from '../components/invite-component/invite.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InvitesPage }])
  ],
    declarations: [InvitesPage, InviteComponent]
})
export class InvitesPageModule {}
