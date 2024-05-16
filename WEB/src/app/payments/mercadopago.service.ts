import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference } from './payments-gateway/payments.interface';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {
  private apiUrl = 'http://localhost:8000/payments/create_preference/'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) {}

  createPreference(preference: Preference): Observable<any> {
    return this.http.post(this.apiUrl,  preference);
  }
}
