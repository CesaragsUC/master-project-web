import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  selector: 'deny-access',
  templateUrl: './deny.access.component.html'
})
export class DenyAcessComponent {

}
