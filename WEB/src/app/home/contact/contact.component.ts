import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  public formContacto!: FormGroup;

  constructor( private fb:FormBuilder, private contactService: ContactService){}

  ngOnInit(): void {
    this.formContacto=this.fb.group({

      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });  
  }

    sendMessage(){

      if (this.formContacto.valid) {
        this.contactService.sendMessage(this.formContacto.value).subscribe(
          respuesta => {
            console.log('Mensaje enviado:', respuesta);
            
          },
          error => {
            console.error('Error al enviar mensaje:', error);
            
          }
        );
      }
    }


}