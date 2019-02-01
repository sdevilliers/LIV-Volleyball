import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from './cell.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CellComponent
  ],
  exports: [
    CellComponent,
    CommonModule,
    FormsModule
  ]

})
export class SharedModule { }
