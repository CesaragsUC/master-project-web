import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ImportsModule } from 'src/app/imports';
import { Product } from 'src/app/models/product/product';
import { FakeProductService } from 'src/app/navigation/home/temp-product.service';


@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  providers: [FakeProductService],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ProductListComponent {
  
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  products: Product[] | undefined;

  constructor(private productService: FakeProductService) {}

   ngOnInit() {

        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
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
  

}
