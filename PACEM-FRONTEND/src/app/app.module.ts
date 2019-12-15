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

@NgModule({
    declarations: [AppComponent, LoginComponent,
        RegisterComponent, LogoutComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(),
        IonicStorageModule.forRoot(), AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}), ReactiveFormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
