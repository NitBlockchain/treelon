import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
{ path: 'home', component: HomeComponent, },
{
  path: 'create',
  loadChildren: () => import('./create/create.module')
    .then(mod => mod.CreateModule)
},
{
  path: 'profile/:user',
  loadChildren: () => import('./profile/profile.module')
    .then(mod => mod.ProfileModule)
},
{
  path: 'teashop',
  loadChildren: () => import('./teashop/teashop.module')
    .then(mod => mod.TeashopModule)
},
{
  path: 'collection/:name',
  loadChildren: () => import('./collection/collection.module')
    .then(mod => mod.CollectionModule)
},
{
  path: 'collection-view/:id',
  loadChildren: () => import('./collection-view/collection-view.module')
    .then(mod => mod.CollectionViewModule)
},
{
  path: 'show/:user/:collection',
  loadChildren: () => import('./show/show.module')
    .then(mod => mod.ShowModule)
},
{
  path: 'session/:type',
  loadChildren: () => import('./session/session.module')
    .then(mod => mod.SessionModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
