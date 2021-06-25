import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeashopComponent } from './teashop.component';

const routes: Routes = [
  { path: '', component: TeashopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeashopRoutingModule { }
