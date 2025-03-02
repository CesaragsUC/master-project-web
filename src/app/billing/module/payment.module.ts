import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { BillingListComponent } from '../list/list.component';
import { DetailsComponent } from '../details/details.component';
import { ErrorPaymentComponent } from '../error/error.component';
import { PaymentSentComponent } from '../created/created.component';

const paymentRouting: Routes = [

  { path: '', component: BillingListComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'details/:transaction', component: DetailsComponent },
  { path: 'list', component: BillingListComponent },
  { path: 'created', component: PaymentSentComponent },
  { path: 'error', component: ErrorPaymentComponent },

];

@NgModule({
  imports: [
      FormsModule,
      CommonModule,
      RouterModule.forChild(paymentRouting)
  ],
})
export class PaymentModule { }
