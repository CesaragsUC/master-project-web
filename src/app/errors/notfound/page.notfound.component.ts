import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'page-notfound',
  templateUrl: './page.notfound.html',
})
export class NotFoundComponent implements OnInit {
  messages: Message[] | undefined;
  ngOnInit() {
    this.messages = [{ severity: 'error', detail: 'Acess deny. You can access this resource.' }];
  }
}