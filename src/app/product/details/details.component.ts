import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class ProductDetailsComponent {

}
