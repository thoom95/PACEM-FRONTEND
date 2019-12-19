import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Glob} from '@angular/service-worker/config';
import {GlobalStorageService} from './global-storage.service';

@Injectable()
export class SocketClientService {
    constructor(public socket: Socket, private globalStorageService: GlobalStorageService) {
        this.socket.connect();
    }

    public getEvents() {
        return new Observable(observer => {
            this.globalStorageService.getToken().then((jwtToken) => {
                const loginModel = {
                    jwtToken,
                    data: {
                        userId: 'kwak'
                    }
                };

                this.socket.emit('getInvitations', JSON.stringify(loginModel));
            });

            this.socket.on('invitation', (data) => {
                return observer.next(data);
            });
        });
    }
/*
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

*/
}
