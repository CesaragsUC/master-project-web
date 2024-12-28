import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './navigation/menu/menu.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { AccountService } from './services/account/account.service';
import { AuthService } from './services/account/auth.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { JwtService } from './services/account/jwt.services';
import { AdminCanMatchGuard } from 'src/guards/admin/admin.can.match.guards';
import { IMPORTS_GUARDS } from 'src/guards/auth.guard.list.import';
import { environment } from 'src/environments/environment';

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
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    console.log('Running environment:', environment);
  }
  title = 'master-project-front';
}
