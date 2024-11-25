import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class ProductUpdateComponent {

}
