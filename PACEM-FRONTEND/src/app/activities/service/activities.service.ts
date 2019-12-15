import {Geolocation} from '@ionic-native/geolocation/ngx';

export class ActivitiesService {
    constructor(private geolocation: Geolocation) {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log('lat' + resp.coords.latitude + '- long' + resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
}
