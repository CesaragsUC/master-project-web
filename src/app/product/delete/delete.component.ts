import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class ProductDeleteComponent {

}
