import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-table-message',
  templateUrl: './table-message.component.html',
  styleUrls: ['./table-message.component.css']
})
export class TableMessageComponent implements OnInit {

  messages: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getMessages();
    
  }

  getMessages(): void {
    this.contactService.getMessages().subscribe(
      (data: any[]) => {
        this.messages = data;
      },
      (error:any) => {
        console.error('Error al obtener los mensajes:', error);
      }
      
    );
    
  }
  deleteMessage(id: number): void {
    this.contactService.deleteMessage(id).subscribe(
      () => {
        this.messages = this.messages.filter(message => message.id !== id);
      },
      (error: any) => {
        console.error('Error al eliminar el mensaje:', error);
      }
    );
  }
  
}
