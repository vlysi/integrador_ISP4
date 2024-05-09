import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
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
    AuthModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
