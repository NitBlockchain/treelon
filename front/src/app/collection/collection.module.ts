import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule

  ],
  exports: [
    CollectionComponent
  ],
  declarations: [
    CollectionComponent
  ],
  providers: [
  ],
})
export class CollectionModule { }
