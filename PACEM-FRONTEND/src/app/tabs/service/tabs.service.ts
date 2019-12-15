import {Storage} from '@ionic/storage';
import {LoginService} from '../../authentication/login/service/login.service';

export class TabsService {
    constructor(private storage: Storage, private loginService: LoginService) {
        this.loginService.checkIfUserIsLoggedAndRedirect();
    }
}
