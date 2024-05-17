import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  paymentId: string;
  paymentStatus: string;
  userEmail: string;
  paymentType: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'];
      this.paymentStatus = params['status'];
      this.userEmail = params['external_reference'];
      this.paymentType = params['payment_type'];

      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          const updatedUser = {...user, is_premium: true};
          this.authService.setCurrentUser(updatedUser);
        }
      });
    

      setTimeout(() => {
        this.router.navigate(['/']); // Asegúrate de ajustar la ruta según tu enrutamiento
      }, 9000);
    });
  }
}
