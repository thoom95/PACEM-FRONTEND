import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GlobalStorageService } from '../../service/global-storage.service';
import { SocketClientService } from '../../service/socket-client.service';
import { UserDomain } from '../../models/domain-model/user.domain';
import { ActivityDomain } from '../../models/domain-model/activity.domain';
import {Observable} from "rxjs";

export class ActivitiesService {
    constructor(public globalStorageService: GlobalStorageService,
                private socketClientService: SocketClientService) {
   /*     this.geolocation.getCurrentPosition().then((resp) => {
            console.log('lat' + resp.coords.latitude + '- long' + resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        }); */
    }

    public getEvents(): Observable<ActivityDomain[]> {
        return new Observable(observer => {
            this.globalStorageService.getToken().then((jwtToken) => {
                const loginModel = {
                    jwtToken,
                    data: {
                        userId: 'kwak'
                    }
                };

                this.socketClientService.socket.emit('getActivities', JSON.stringify(loginModel));

                // this.socketClientService.socket.on('activity-error', (data) => {
                //     // reject(data);
                // });

                this.socketClientService.socket.on('activity', (data: ActivityDomain[]) => {

                    // console.log("Nieuwe activities --");
                    // console.log(data);
                    // console.log("Nieuwe activities --");

                    observer.next(data);
                });
            }).catch(() => {
                console.log("getActivities kan geen token ophalen");
            });
        });
    }

    public subscribeActivity(activityId: number): void {
        this.globalStorageService.getToken().then((jwtToken) => {
            const loginModel = {
                jwtToken,
                data: {
                    activityId
                }
            };

            this.socketClientService.socket.emit('subscribeActivity', JSON.stringify(loginModel));
        });
    }

    public submitNewActivity(data: object) {
        console.log('test1');

        this.globalStorageService.getToken().then((jwtToken) => {
            console.log('jwttoken get');
            const activityModel = {
                jwtToken,
                data: {
                    data
                }
            };
            console.log('test2');

            this.socketClientService.socket.emit('addActivity', JSON.stringify(activityModel));

        });
    }
}
