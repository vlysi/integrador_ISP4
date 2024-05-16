import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  public formContacto!: FormGroup;
  mensaje:string = '';
  error:string = '';
  name:string='';
  lastname:string='';
  mail:string='';
  msg:string='';


  constructor( private fb:FormBuilder, private contactService: ContactService){}

  ngOnInit(): void {
    this.formContacto=this.fb.group({

      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['',[ Validators.required, Validators.minLength(3) ]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required ]
    });  
  }

    sendMessage(){

      if (this.formContacto.valid) {
        this.contactService.sendMessage(this.formContacto.value).subscribe(
          respuesta => {
            console.log('Mensaje enviado:', respuesta);
            this.mensaje='Mensaje enviado correctamente';
            this.name='';
            this.lastname='';
            this.mail='';
            this.msg='';

            
          },
          error => {
            console.error('Error al enviar mensaje:', error);
            this.error='Error al enviar el mensaje ' , error;
            
          }
        );
      } else {
        console.error('El formulario no es valido');
      }
    }


}