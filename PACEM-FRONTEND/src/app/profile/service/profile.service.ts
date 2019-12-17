import {Injectable} from '@angular/core';
import {SocketClientService} from '../../service/socket-client.service';

@Injectable()
export class ProfileService {
    constructor(private socketClientService: SocketClientService) {
    }

}
