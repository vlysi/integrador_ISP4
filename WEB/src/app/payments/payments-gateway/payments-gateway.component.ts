import { Component } from '@angular/core';
import { MercadopagoService } from '../mercadopago.service';



import {  Payer, Preference } from './payments.interface';
// Agrega credenciales




@Component({
  selector: 'app-payments-gateway',
  templateUrl: './payments-gateway.component.html',
  styleUrls: ['./payments-gateway.component.css']
})
export class PaymentsGatewayComponent {
  constructor(private mercadoPagoService: MercadopagoService) {}

  pay() {
    // Crear objeto de preferencia correctamente sin anidar items innecesariamente
    const preference: Preference = {
      items: [
          {
              title: 'PassKeeper Premium Version',
              quantity: 1,
              unit_price: '5000' // El precio está como string, conforme a la definición de la interfaz
          }
      ],
      
      back_urls: {
          success: 'http://localhost:4200/payments/success',
          failure: 'http://localhost:4200',
          pending: 'http://localhost:4200'
      },
      auto_return: 'approved' // Asegurándose de que corresponda a uno de los valores permitidos
  };    
    
    this.mercadoPagoService.createPreference(preference).subscribe(
      response => {
        const initPoint = response.init_point; // Asegúrate de que el punto de inicio está en la respuesta del backend
        window.location.href = initPoint; // Redirige al usuario para completar el pago
      },
      error => {
        console.error('Error creating payment preference: ', error);
      }
    );
  }
}