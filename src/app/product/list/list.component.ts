import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ProductListComponent {

}
