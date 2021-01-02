import { NgModule } from '@angular/core';
import {
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
} from '@angular/material';
@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class MaterialModule { }
