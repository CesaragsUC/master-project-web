import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  selector: 'app-created',
  standalone: true,
  imports: [CommonModule,ImportsModule],
  templateUrl: './created.component.html',
  styleUrl: './created.component.scss'
})
export class PaymentSentComponent {

}
