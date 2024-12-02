import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './navigation/menu/menu.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { AccountService } from './services/account/account.service';
import { AuthService } from './services/account/auth.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { JwtService } from './services/account/jwt.services';
import { AdminCanMatchGuard } from 'src/guards/admin/admin.can.match.guards';
import { IMPORTS_GUARDS } from 'src/guards/auth.guard.list.import';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    FooterComponent],
  providers: [JwtService,IMPORTS_GUARDS,AccountService,AuthService],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'master-project-front';
}
