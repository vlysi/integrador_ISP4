import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsGatewayComponent } from './payments-gateway/payments-gateway.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PaymentsGatewayComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
