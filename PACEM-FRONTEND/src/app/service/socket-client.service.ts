import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable()
export class SocketClientService {
    constructor(public socket: Socket) {
        this.socket.connect();
    }

}
