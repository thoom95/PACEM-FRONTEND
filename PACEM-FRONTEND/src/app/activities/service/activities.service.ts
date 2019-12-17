import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GlobalStorageService} from '../../service/global-storage.service';
import {SocketClientService} from '../../service/socket-client.service';
import {UserDomain} from '../../models/domain-model/user.domain';

export class ActivitiesService {
    constructor(private geolocation: Geolocation, public globalStorageService: GlobalStorageService, private socketClientService: SocketClientService) {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log('lat' + resp.coords.latitude + '- long' + resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    public getEvents(): Promise<UserDomain> {
        return new Promise((resolve, reject) => {
            this.globalStorageService.getToken().then((jwtToken) => {
                const loginModel = {
                    jwtToken,
                    data: {
                        userId: ''
                    }
                };

                this.socketClientService.socket.emit('getEvents', JSON.stringify(loginModel));

                this.socketClientService.socket.on('event-error', (data) => {
                    this.socketClientService.socket.removeListener('event-error');
                    this.socketClientService.socket.removeListener('event');
                    reject(data);
                });

                this.socketClientService.socket.on('event', (data: UserDomain) => {
                    this.socketClientService.socket.removeListener('event-error');
                    this.socketClientService.socket.removeListener('event');

                    resolve(data);
                });
            });

        });
    }
}
