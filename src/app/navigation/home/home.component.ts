import { Component, inject } from '@angular/core';
import { ImportsModule } from 'src/app/imports';
import { Product } from 'src/app/models/product/product';
import { FakeProductService } from './temp-product.service';
import { ProductService } from 'src/app/services/product/product.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ProductFilter } from 'src/app/dtos/product.filter';
import { Message, SelectItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CartService } from 'src/app/services/basket/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ImportsModule,NgxSpinnerComponent],
  providers: [FakeProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  products: Product[] | undefined;
  productFilter: ProductFilter;
  sortOptions!: SelectItem[];
  messages: Message[] | undefined;
  sortOrder!: number;
  first: number = 0;
  rows: number = 10;
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService,
    private menuService: MenuService
  ) {}

 spinner = inject(NgxSpinnerService);
 private cartService = inject(CartService);

  ngOnInit() {
    this.spinner.show();

      this.getallProducts();
      
      
      setTimeout(() => {
        this.spinner.hide();
    }, 1000);
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

  addToCart(product: any):void {
    this.cartService.addToCart(product);

  }

  initializeFilter() {
        this.productFilter = {
            onlyActive: true,
            name: '',
            minPrice: null,
            maxPrice: null,
            page: 1,
            pageSize: 10,
            orderBy: 'createAt',
            orderDirection: 'asc',
        };

        this.page = 1;
        this.pageSize = 10;
    }

    getallProducts()
    {
        this.productService.getAll().subscribe({
            next: (result) => {
            if (result.success && Array.isArray(result.data)) {
                this.products = result.data.map(prod => ({
                ...prod,
                inventoryStatus: prod.active ? 'INSTOCK' : 'OUTOFSTOCK',
                imageUri: prod.imageUri && prod.imageUri.trim() !== '' ? prod.imageUri : '/assets/no-image.jpg',
                id: prod.id,
                }));

                this.totalItems = result.totalItems;
                this.totalPages = result.totalPages;
                // console.error('result', result);
                // console.error('productsArray', this.products);
              
            } else {
                console.error('Failed to load products:', result.message);
            }
            },
            error: (err) => console.error('Error fetching products:', err),
        });
    }
}
