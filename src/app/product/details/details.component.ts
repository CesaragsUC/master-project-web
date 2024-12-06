import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ImportsModule } from 'src/app/imports';
import { Product } from 'src/app/models/product/product';
import { FakeProductService } from 'src/app/navigation/home/temp-product.service';
import { Location } from '@angular/common';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule,NgxSpinnerComponent],
  providers: [FakeProductService],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class ProductDetailsComponent {

  product: Product | undefined;

  constructor(private productService: ProductService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.product = this.route.snapshot.data['product'].data;
  }

  spinner = inject(NgxSpinnerService);

  ngOnInit() {

    this.spinner.show();

      //  this.productService.getById(this.product.productId).then((p) => {
      //      this.product = p;
      //  });
   
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

  backPreviousPage() {
    this.location.back();
  }
}
