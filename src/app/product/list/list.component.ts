import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, Message, MessageService, SelectItem } from 'primeng/api';
import { filterByDirections, FilterByOrder, FilterByStatus, orderByDirections, orderByOptions, ProductFilter, statusOptions } from 'src/app/dtos/product.filter';
import { ImportsModule } from 'src/app/imports';
import { Product } from 'src/app/models/product/product';
import { FakeProductService } from 'src/app/navigation/home/temp-product.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { PageEvent } from 'src/app/utils/page.event';
import { StringUtils } from 'src/app/utils/string-utils';


@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule,NgxSpinnerComponent],
  providers: [FakeProductService,ProductService,ConfirmationService,MessageService],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})


export class ProductListComponent {
  
  sortOptions!: SelectItem[];
  messages: Message[] | undefined;
  sortOrder!: number;
  first: number = 0;
  rows: number = 10;
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
  sortField!: string;
  productFilter: ProductFilter;
  products: Product[] | undefined;
  filterForm: FormGroup | undefined;  
  filterByStatus: FilterByStatus[] | undefined;
  filterOrderBy: FilterByOrder[] | undefined;
  filterByDirections: filterByDirections[] | undefined;
  errorMessage!: any;

  constructor(private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router) {}

    spinner = inject(NgxSpinnerService);

    ngOnInit() {
        this.spinner.show();

        this.initializeFilter();

        this.filterByStatus = statusOptions;
        this.filterOrderBy = orderByOptions;
        this.filterByDirections = orderByDirections;

        this.filterForm = this.fb.group({
            name: [''],
            minPrice: [''],
            maxPrice: ['']
          });

        this.getallProducts();

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];

        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }


    onPageChange(event: PageEvent) {

        this.pageSize = CurrencyUtils.StringToInteger(event.rows);
        this.page = CurrencyUtils.StringToInteger(event.page) + 1 ;
        this.productFilter.page = this.page;
        this.productFilter.pageSize = this.pageSize;

        this.productService.getAll(this.productFilter).subscribe({
            next: (result) => {
            if (result.success && Array.isArray(result.data)) {
                this.products = result.data.map(prod => ({
                ...prod,
                inventoryStatus: prod.active ? 'INSTOCK' : 'OUTOFSTOCK',
                imageUri: prod.imageUri && prod.imageUri.trim() !== '' ? prod.imageUri : '/assets/no-image.jpg',
                }));

                this.totalItems = result.totalItems;
                this.totalPages = result.totalPages;
            } else {
                console.error('Failed to load products:', result.message);
            }
            },
            error: (err) => console.error('Error fetching products:', err),
        });
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

    onStatusChange(event: any)
    {
        let value = event.value;
        this.productFilter.onlyActive = StringUtils.StringToBoolean(value.code);
    }

    onOrderByChange(event: any)
    {
        let value = event.value;
        this.productFilter.orderBy = value.code;
    }

    onOrderByDescAscChange(event: any)
    {
        let value = event.value;
        this.productFilter.orderDirection = value.code;
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

    confirmDelete(id:string) {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {

                this.spinner.show();
                this.productService.deleteProduct(id).subscribe({
                    next: (sucesso: any) => { this.processSuccessDelete(sucesso) },
                    error: (falha: any) => { this.processFailDelete(falha) }
                });

                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            },
            reject: () => {
                this.messageService.add({ severity: 'contrast', summary: 'Canceled', detail: 'Deletion cancelled', life: 3000 });
            }
        });
    }

    applyFilter() {
        this.spinner.show();

        if (this.filterForm.valid)
        {
          this.productFilter = Object.assign({}, this.productFilter, this.filterForm.value);

          this.productFilter.maxPrice = CurrencyUtils.IntegerToDecimal(this.productFilter.maxPrice);
          this.productFilter.minPrice = CurrencyUtils.IntegerToDecimal(this.productFilter.minPrice);

          this.productService.getAll(this.productFilter).subscribe({
              next: (sucesso: any) => { this.processSuccess(sucesso) },
              error: (falha: any) => { this.processFail(falha) }
          });
        }
    
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

    processSuccess(response:any)
    {
        if (response.success) 
        {
            this.products = response.data.map((prod: any) => ({
                ...prod,
                inventoryStatus: prod.active ? 'INSTOCK' : 'OUTOFSTOCK',
                imageUri: prod.imageUri && prod.imageUri.trim() !== '' ? prod.imageUri : '/assets/no-image.jpg',
            }));

            this.totalItems = response.totalItems;
            this.totalPages = response.totalPages;
        }
    }

    processFail(response:any)
    {
        const errorMessages = response.error?.errors;

        const detailMessage = Array.isArray(errorMessages) 
        ? errorMessages.map((msg: string) => `- ${msg}`).join('\n') 
        : 'An unexpected error occurred.';
    
        this.messages = [
            { severity: 'error', summary: 'Failed to create product', detail: detailMessage }
        ];
    }

    processSuccessDelete(response:any)
    {
        if (response.succeeded) 
        {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted', life: 3000 });
            this.getallProducts();

        }
    }

    processFailDelete(response:any)
    {
        const errorMessages = response.error?.errors;

        const detailMessage = Array.isArray(errorMessages) 
        ? errorMessages.map((msg: string) => `- ${msg}`).join('\n') 
        : 'An unexpected error occurred.';

        this.messageService.add({ severity: 'error', summary: 'Failed to delete product', detail: 'Fail to deleted', life: 3000 });
        
        this.messages = [
            { severity: 'error', summary: 'Failed to delete product', detail: detailMessage }
        ];

        this.router.navigate(['/products']);
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

    clearFilter() {
        this.filterForm.reset();
        this.initializeFilter();
        this.applyFilter();
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