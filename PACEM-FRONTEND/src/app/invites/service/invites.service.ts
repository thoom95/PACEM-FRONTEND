import {GlobalStorageService} from '../../service/global-storage.service';
import {SocketClientService} from '../../service/socket-client.service';

export class InvitesService {

    constructor(public globalStorageService: GlobalStorageService,
                private socketClientService: SocketClientService) {

    }

    public acceptInvite(activityId: number) {
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

   public declineInvite(activityId: number) {
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
}
