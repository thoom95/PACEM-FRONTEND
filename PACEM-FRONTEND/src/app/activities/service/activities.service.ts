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


    public getEvents(email: string, password: string): Promise<UserDomain> {
        return new Promise((resolve, reject) => {

            const loginModel = {
                jwtToken: '',
                data: {
                    userId: ''
                }
            };

            this.socketClientService.socket.emit('authWithCreds', JSON.stringify(loginModel));

            this.socketClientService.socket.on('invalid-request', (data) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('authenticated');
                reject(data);
            });

            this.socketClientService.socket.on('authenticated', (data: UserDomain) => {
                this.socketClientService.socket.removeListener('invalid-request');
                this.socketClientService.socket.removeListener('authenticated');

                resolve(data);
            });
        });
    }
}
