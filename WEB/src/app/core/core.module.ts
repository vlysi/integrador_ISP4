import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../../app/auth/auth.module';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,


  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AuthModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
