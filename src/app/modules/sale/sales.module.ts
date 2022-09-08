import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class SalesModule {
  _id!: string;
  name!: string;
  quantity!: number;
  price!: number;
  owner!: string;
}
