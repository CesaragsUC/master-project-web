import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from '../list/list.component';
import { DetailsComponent } from '../details/details.component';

const orderRouting: Routes = [

  { path: '', component: OrderListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'list', component: OrderListComponent }

];

@NgModule({
  imports: [
      FormsModule,
      CommonModule,
      RouterModule.forChild(orderRouting)
  ],
})
export class OrderModule { }
