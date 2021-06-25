import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { TeashopComponent } from './teashop.component';
import { TeashopRoutingModule } from './teashop-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TeashopRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    TeashopComponent
  ],
  declarations: [
    TeashopComponent
  ],
  providers: [
  ],
})
export class TeashopModule { }
