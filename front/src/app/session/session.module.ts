import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { SessionComponent } from './session.component';
import { SessionRoutingModule } from './session-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    SessionRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule

  ],
  exports: [
    SessionComponent
  ],
  declarations: [
    SessionComponent
  ],
  providers: [
  ],
})
export class SessionModule { }
