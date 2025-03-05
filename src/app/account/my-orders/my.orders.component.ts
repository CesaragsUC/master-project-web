import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ImportsModule } from 'src/app/imports';
import { Order } from 'src/app/models/order/order';
import { Product } from 'src/app/models/product/product';
import { BaseService } from 'src/app/services/base.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ImportsModule,NgxSpinnerComponent],
  providers: [ MessageService],
  templateUrl: './my.orders.component.html',
  styleUrl: './my.order.component.css'
})
export class MyOrdersComponent extends BaseService  implements OnInit{
  
  //PaymentStatus
  // Created = 1,
  // Cancelled = 2,
  // Complted = 3,
  // Shipped = 4,
  // Delivered = 5,
  // Returned = 6,
  // Refunded = 7,
  // PartiallyRefunded = 8,
  // PaymentFailed = 9,
  // Pending = 10,

    orders!: Order[];

    expandedRows = {};
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
      messageService = inject(MessageService);
      spinner = inject(NgxSpinnerService);

      constructor() {
        super();

      }

      ngOnInit(): void {
        this.spinner.show();

        this.customerId = this.localStorage.getUser().id;

        this.orderService.getOrder(this.customerId).subscribe({
          next: (order) => {
            this.orders = order.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          },
          error: (error) => {
            console.error("fail to load order", error);
          }
        });


        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }

    
    expandAll() {
        //this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'PENDING':
                return 'warn';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }
}
