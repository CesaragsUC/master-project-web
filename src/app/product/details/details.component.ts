import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImportsModule } from 'src/app/imports';
import { Product } from 'src/app/models/product/product';
import { FakeProductService } from 'src/app/navigation/home/temp-product.service';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  providers: [FakeProductService],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class ProductDetailsComponent {

  products: Product[] | undefined;
  constructor(private productService: FakeProductService,private location: Location) {}

  ngOnInit() {

       this.productService.getProductsSmall().then((products) => {
           this.products = products;
       });

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

  backPreviousPage() {
    this.location.back();
  }
}
