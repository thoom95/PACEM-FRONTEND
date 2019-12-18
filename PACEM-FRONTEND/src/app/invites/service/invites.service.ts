import {ActivityDomain} from '../../models/domain-model/activity.domain';
import {GlobalStorageService} from '../../service/global-storage.service';
import {SocketClientService} from '../../service/socket-client.service';

export class InvitesService {

constructor(public globalStorageService: GlobalStorageService,
            private socketClientService: SocketClientService) {

    this.socketClientService.socket.on('invitation', (data) => {

        console.log(data);
    });
}
    public getInvites() {
            this.globalStorageService.getToken().then((jwtToken) => {
                const loginModel = {
                    jwtToken,
                    data: {
                        userId: 'kwak'
                    }
                };

                this.socketClientService.socket.emit('getInvitations', JSON.stringify(loginModel));
            });
    }
}
