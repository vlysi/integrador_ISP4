import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsGatewayComponent } from './payments-gateway/payments-gateway.component';

const routes: Routes = [
  {path: '', component:PaymentsGatewayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
