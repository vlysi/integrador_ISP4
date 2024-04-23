import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SinginComponent } from './singin/singin.component';


@NgModule({
  declarations: [
    LoginComponent,
    SinginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [
    LoginComponent,
    SinginComponent
  ]
})
export class AuthModule { }
