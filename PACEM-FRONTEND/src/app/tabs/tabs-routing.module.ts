import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {SocketClientService} from '../service/socket-client.service';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'agenda',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../agenda/agenda.module').then(m => m.AgendaPageModule)
                    }
                ]
            },
            {
                path: 'invites',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../invites/invites.module').then(m => m.InvitesPageModule)
                    }
                ]
            },
            {
                path: 'activities',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../activities/activities.module').then(m => m.ActivitiesModule)
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../profile/profile.module').then(m => m.ProfilePageModule)
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../settings/settings.module').then(m => m.SettingsPageModule)
                    }
                ]
            },
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/agenda',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
    constructor(private socketClientService: SocketClientService) {
        /*   console.log('kwak');
           this.socketClientService.connectedToSocketServer().subscribe((data) => {
               console.log(data);
           });*/
    }
}
