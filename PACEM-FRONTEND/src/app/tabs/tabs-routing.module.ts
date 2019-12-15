import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
                import('../activities/activities.module').then(m => m.InvitesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full'
      }
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
export class TabsPageRoutingModule {}
