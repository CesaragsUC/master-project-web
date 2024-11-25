import { Component } from '@angular/core';
import { ProductService } from './temp-product.service';
import { ImportsModule } from 'src/app/imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportsModule],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  products: Product[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  
  ngOnInit() {
      this.productService.getProductsSmall().then((products) => {
          this.products = products;
      });

      this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
  }
  
  viewDetails(product: any) {
    console.log('View details of:', product.name);
  }

  addToCart(product: any) {
    console.log('Add to cart:', product.name);
  }
}
export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}