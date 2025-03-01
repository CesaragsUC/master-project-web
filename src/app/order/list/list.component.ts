import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Order } from 'src/app/models/order/order';
import { BaseService } from 'src/app/services/base.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class OrderListComponent extends BaseService  implements OnInit{

      orderList: Order =
      {
        id: '',
        createdAt: '',
        customerId: '',
        items: [],
        totalAmount: 0,
        status: 0,
        name: '',
        paymentToken: '',

      }

      customerId: string;
      orderService = inject(OrderService);
      spinner = inject(NgxSpinnerService);

      constructor() {
        super();

      }

      ngOnInit(): void {
        this.spinner.show();

        this.customerId = this.localStorage.getUser().id;

        this.orderService.getOrder(this.customerId).subscribe({
          next: (order) => {
           // this.orderList = order.data;
          },
          error: (error) => {
            console.error("fail to load order", error);
          }
        });


        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }
}
