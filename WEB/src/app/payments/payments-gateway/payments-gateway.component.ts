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
    const payerInfo: Payer = {
      email: 'cenma.notas@example.com',
      
  };

    // Crear objeto de preferencia correctamente sin anidar items innecesariamente
    const preference: Preference = {
      items: [
          {
              title: 'Libro de Python',
              quantity: 1,
              unit_price: '200' // El precio está como string, conforme a la definición de la interfaz
          }
      ],
      payer: payerInfo,
      back_urls: {
          success: 'http://localhost:4200/payments/',
          failure: 'http://localhost:4200',
          pending: 'http://localhost:4200'
      },
      auto_return: 'approved' // Asegurándose de que corresponda a uno de los valores permitidos
  };
    
    console.log('Sending preference to backend:', preference);
    this.mercadoPagoService.createPreference(preference).subscribe(
      response => {
        const initPoint = response.sandbox_init_point; // Asegúrate de que el punto de inicio está en la respuesta del backend
        window.location.href = response.sandbox_init_point; // Redirige al usuario para completar el pago
      },
      error => {
        console.error('Error creating payment preference: ', error);
      }
    );
  }
}