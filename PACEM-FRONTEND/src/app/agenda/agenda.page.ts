import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import {ActivitiesService} from '../activities/service/activities.service';
import * as moment from "moment";

@Component({
  selector: 'app-agenda',
  templateUrl: 'agenda.page.html',
  styleUrls: ['agenda.page.scss'],
})
export class AgendaPage {

  public events = [];
  public currentDate = new Date();

  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, private activitiesService: ActivitiesService, @Inject(LOCALE_ID) private locale: string) {
    moment.locale('nl');

    this.activitiesService.getEvents().subscribe((activities) => {
      this.events = activities.map((activity) => {
        return {
          title: activity.name,
          desc: activity.location.info,
          startTime: new Date(Number(activity.startTime) * 1000),
          endTime: new Date(Number(activity.endTime) * 1000),
          allDay: false
        };
      });
    });
  }

  async onEventSelected(event) {
    const start = formatDate(event.startTime, 'medium', this.locale);
    const end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Van: ' + start + '<br><br>Tot: ' + end,
      buttons: ['OK']
    });

    await alert.present();
  }

  public onCurrentChanged(date: Date) {
    this.currentDate = date;
  }

  public getFriendlyDate(date: Date) {
    return moment(date).format('dddd D MMMM');
  }

  public getDayOfMonth(date: Date) {
    return moment(date).format('D');
  }
}
