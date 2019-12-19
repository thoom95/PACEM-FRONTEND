import {GlobalStorageService} from '../../service/global-storage.service';
import {SocketClientService} from '../../service/socket-client.service';
import {Observable} from 'rxjs';

export class InvitesService {

constructor(public globalStorageService: GlobalStorageService,
            private socketClientService: SocketClientService) {

}

}
