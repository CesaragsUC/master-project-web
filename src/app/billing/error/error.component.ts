import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule,ImportsModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorPaymentComponent {

}
