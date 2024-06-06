import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactUrl = environment.apiUrl + '/contact/messages/';

  constructor(private http: HttpClient) {
    console.log('*** Service Contact messages running ***');
  }

  // Método para realizar la solicitud POST
  sendMessage(mensaje: any): Observable<any> {
    return this.http.post<any>(this.contactUrl, mensaje);
  }

  // Método para realizar una solicitud GET
  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.contactUrl);
  }
  deleteMessage(id: number): Observable<any> {
    const url = `${this.contactUrl}${id}/`;
    return this.http.delete<any>(url);
  }

}
