import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'deny-access',
  templateUrl: './deny.access.component.html'
})
export class AccessDeniedComponent implements OnInit {
  messages: Message[] | undefined;
  ngOnInit() {
    this.messages = [{ severity: 'error', detail: 'Access Denied: You do not have the necessary permissions to access this resource.' }];
  }
}
