import {Router} from '@angular/router';
import {SocketClientService} from '../../service/socket-client.service';
import {UserDomain} from '../../models/domain-model/user.domain';
import {GlobalStorageService} from '../../service/global-storage.service';
import {Colleague, NewActivity} from '../create-activities.component';


export class CreateActivitiesService {
    constructor(private router: Router,
                private globalStorageService: GlobalStorageService,
                private socketClientService: SocketClientService) {

    }

    public getUsers(): Promise<UserDomain[]> {
        return new Promise((resolve, reject) => {
            this.globalStorageService.getToken().then((jwtToken) => {
                const loginModel = {
                    jwtToken,
                    data: {
                        userId: 'kwak'
                    }
                };

                this.socketClientService.socket.emit('getUsers', JSON.stringify(loginModel));

                this.socketClientService.socket.on('user-error', (data) => {
                    this.socketClientService.socket.removeListener('user-error');
                    this.socketClientService.socket.removeListener('user');

                    reject(data);
                });

                this.socketClientService.socket.on('user', (data: UserDomain[]) => {
                    this.socketClientService.socket.removeListener('user-error');
                    this.socketClientService.socket.removeListener('user');
                    resolve(data);
                });
            });
        });
    }

    addActivity(formData: NewActivity) {
        this.globalStorageService.getToken().then((jwtToken) => {
            const loginModel = {
                jwtToken,
                data: {
                    name: formData.name,
                    maxParticipants: formData.maxParticipants,
                    location: formData.location,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    colleagues: formData.colleagues,
                }
            };

            this.socketClientService.socket.emit('addActivity', JSON.stringify(loginModel));

        });
    }
}
