import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserLogin } from 'src/app/models/user/user.login';
import { AccountService } from 'src/app/services/account/account.service';
import { ToastModule } from 'primeng/toast';
import { ImportsModule } from 'src/app/imports';
import { AuthService } from 'src/app/services/account/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ImportsModule

  ],
  providers: [
    AccountService,
    MessageService,
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  errors: any[] = [];
  loginForm!: FormGroup;
  userLogin!: UserLogin;
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private authService: AuthService) 
    {
      this.route.queryParams.subscribe(params => {
        this.returnUrl = params['returnUrl'] || '/'; // Define um valor padrão
      });
    }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }


  login() {
    console.log('login trigred');
    console.log(this.loginForm.value);
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.userLogin = Object.assign({}, this.userLogin, this.loginForm.value);

      this.accountService.login(this.userLogin)
      .subscribe({
        next: response => this.processarSucesso(response),
        error: fail => this.processarFalha(fail)
      });
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

     this.authService.login(response);

     this.returnUrl
     ? this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
         this.router.navigate([this.returnUrl]);
       })
     : this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
         this.router.navigate(['/']);
      });
    
  }

  processarFalha(fail: any){
     this.errors = fail.error.messages;
  }
}
