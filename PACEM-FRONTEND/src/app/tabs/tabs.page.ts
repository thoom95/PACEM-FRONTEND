import {Component} from '@angular/core';
import {TabsService} from './service/tabs.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    constructor(private tabsService: TabsService, private router: Router) {

    }
}
