import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { ImportsModule } from "src/app/imports";
import { CreatePayment, CreditCard } from "src/app/models/billing/create.payment";
import { BaseService } from "src/app/services/base.service";
import { OrderService } from "src/app/services/orders/order.service";
import { PaymentService } from "src/app/services/payment/payment.service";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImportsModule,
    NgxSpinnerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent extends BaseService implements OnInit {

       paymentService = inject(PaymentService);
       orderService = inject(OrderService);
       spinner = inject(NgxSpinnerService);
       customerId :string;
       orderId :string;
       totalAmount: number = 0;
       cardForm :FormGroup;

      creatPayment: CreatePayment = {
            customerId: '',
            orderId: '',
            creditCard: {
              holder: '',
              cardNumber: '',
              expirationDate: '',
              securityCode: ''
          }
      };

      cardData: CreditCard = {

        holder: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: ''
        
      };

      constructor(private fb: FormBuilder,private router: Router) {
        super();

        this.initPaymentForm();
      }

      ngOnInit(): void {
        this.spinner.show();
  
        this.customerId = this.localStorage.getUser().id;
        
        this.orderService.getOrder(this.customerId).subscribe({
          next: (orderResponse) => {

            const validOrders = orderResponse.data.filter(order => order.status === 1);
            if (validOrders.length > 0) 
            {
              const order = validOrders[0];

              this.orderId = order.id;
              this.totalAmount = order.totalAmount;
            }

          },
          error: (error) => {
            console.error("fail to load order", error);
          }
        });


        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }

    sendPayment() {

      this.spinner.show();

        if (this.cardForm.dirty && this.cardForm.valid)
        {
          this.cardData = Object.assign({}, this.cardData, this.cardForm.value);

          this.creatPayment = {
                customerId: this.customerId,
                orderId: this.orderId,
                creditCard: this.cardData
          }

          this.paymentService.sendPayment(this.creatPayment)
            .subscribe({
              next: (sucesso: any) => { this.processarSucesso(sucesso) },
              error: (falha: any) => { this.processarFalha(falha) }
          });
        }

        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

    initPaymentForm() {
      this.cardForm = this.fb.group({
        holder: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]], // Apenas texto
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // Apenas números, 16 dígitos
        expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])-(20\d{2})$/)]], // MM-YYYY
        securityCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]] // Apenas 3 números
      });
    }

    processarSucesso(response: any) 
    {
        if (response.succeeded) 
        {
            this.router.navigate(['billing/created']);

        }else {
            this.router.navigate(['billing/failed']);
        }
        
    }
  
    processarFalha(fail: any) {
  
      const errorMessages = fail.error?.messages;
  
       const detailMessage = Array.isArray(errorMessages) 
       ? errorMessages.map((msg: string) => `- ${msg}`).join('\n') 
       : 'An unexpected error occurred.';

       this.router.navigate(['billing/error']);
    }

    onlyNumbers(event: KeyboardEvent) {
      const charCode = event.key.charCodeAt(0);
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }
  
    formatCardNumber(event: any) {
      let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número
      value = value.substring(0, 16); // Limita a 16 dígitos
  
      // Adiciona espaço a cada 4 dígitos
      value = value.replace(/(\d{4})/g, '$1 ').trim();
  
      event.target.value = value;
      this.cardForm.controls['cardNumber'].setValue(value.replace(/\s/g, '')); // Salva sem espaços no FormGroup
    }
  
    formatExpirationDate(event: any) {
      let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número
      if (value.length > 2) {
        value = value.substring(0, 2) + '-' + value.substring(2, 6); // Formato MM-YYYY
      }
      event.target.value = value;
      this.cardForm.controls['expirationDate'].setValue(value);
    }
  }