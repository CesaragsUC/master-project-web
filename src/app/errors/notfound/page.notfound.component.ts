import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'page-notfound',
  templateUrl: './page.notfound.html'
})
export class NotFoundComponent {

}