import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ShowComponent } from './show.component';
import { ShowRoutingModule } from './show-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    ShowRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule

  ],
  exports: [
    ShowComponent
  ],
  declarations: [
    ShowComponent
  ],
  providers: [
  ],
})
export class ShowModule { }
