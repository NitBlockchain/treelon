import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { CollectionViewComponent } from './collection-view.component';
import { CollectionViewRoutingModule } from './collection-view-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    CollectionViewRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule

  ],
  exports: [
    CollectionViewComponent
  ],
  declarations: [
    CollectionViewComponent
  ],
  providers: [
  ],
})
export class CollectionViewModule { }
