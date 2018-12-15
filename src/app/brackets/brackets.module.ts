import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketsComponent } from './brackets.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    BracketsComponent
  ],
  exports: [
    BracketsComponent
  ]
})
export class BracketsModule { }
