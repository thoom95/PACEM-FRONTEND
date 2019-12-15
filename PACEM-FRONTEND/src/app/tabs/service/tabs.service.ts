import {Storage} from '@ionic/storage';

export class TabsService {
    constructor(private storage: Storage) {

    }

    public isLoggedIn(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {
                if (!token) {
                    reject();
                }

                resolve(token);
            }).catch(() => {
                reject();
            });
        });
    }
}
