import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './authentication/login/login.component';
import {RegisterComponent} from './authentication/register/register.component';
import {LogoutComponent} from './authentication/logout/logout.component';
import {IonicStorageModule} from '@ionic/storage';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {AuthenticationService} from './authentication/service/authentication.service';
import {ActivitiesService} from './activities/service/activities.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {ProfileService} from './profile/service/profile.service';
import {SocketClientService} from './service/socket-client.service';
import {GlobalStorageService} from './service/global-storage.service';

const config: SocketIoConfig = {url: 'http://127.0.0.1:8088', options: {}};

@NgModule({
    declarations: [AppComponent, LoginComponent,
        RegisterComponent, LogoutComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(),
        IonicStorageModule.forRoot(), AppRoutingModule,
        SocketIoModule.forRoot(config),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}), ReactiveFormsModule],
    providers: [
        StatusBar,
        GlobalStorageService,
        ProfileService,
        ActivitiesService,
        SocketClientService,
        Geolocation,
        NativeGeocoder,
        AuthenticationService,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
