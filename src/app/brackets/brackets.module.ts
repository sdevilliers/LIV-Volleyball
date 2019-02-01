import { NgModule } from '@angular/core';
import { BracketsComponent } from './brackets.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BracketsComponent
  ],
  exports: [
    BracketsComponent
  ]
})
export class BracketsModule { }
