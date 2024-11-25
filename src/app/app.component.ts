import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './navigation/menu/menu.component';
import { FooterComponent } from './navigation/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'master-project-front';
}
