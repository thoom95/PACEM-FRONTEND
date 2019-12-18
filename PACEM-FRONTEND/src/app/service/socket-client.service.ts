import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable()
export class SocketClientService {
    constructor(public socket: Socket) {
        this.socket.connect();
    }

    public connectedToSocketServer() {
        return new Observable(observer => {
            this.socket.on('disconnect', () => {
                console.log('meep');
                return observer.next('disconnected');
            });

            this.socket.on('connect_error', () => {
                console.log('meep');
                return observer.next('connect_error');
            });

            this.socket.on('connect', () => {
                console.log('moop');
                return observer.next('connected');
            });
        });
    }
}
