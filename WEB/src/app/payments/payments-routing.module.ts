import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsGatewayComponent } from './payments-gateway/payments-gateway.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  {path: '', component:PaymentsGatewayComponent},
  { path: 'success', component: PaymentSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
