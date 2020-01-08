import {SocketClientService} from '../../service/socket-client.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NoConnectionService {

    constructor(private router: Router, private socketClientService: SocketClientService) {
        socketClientService.socket.on('disconnect', () => {
            router.navigateByUrl('/no-connection');
        });

        socketClientService.socket.on('connect', () => {
           router.navigateByUrl('/login');
        });
    }

    public checkForConnectionAndRedirect() {
        if (!this.socketClientService.socket.ioSocket.connected) {
            this.router.navigateByUrl('/no-connection');
        }
    }
}
