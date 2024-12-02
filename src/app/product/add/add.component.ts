import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Location } from '@angular/common';
import { FileUploadEvent, UploadEvent } from 'primeng/fileupload';
import { ImportsModule } from 'src/app/imports';
import { ProductAdd } from 'src/app/models/product/product.create';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';


@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule,NgxSpinnerComponent ],
  providers: [MessageService,ProductService],
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductAddComponent  implements OnInit {

  uploadedFiles: any[] = [];
  base64List: any[] = [];
  errors: any[] = [];
  productForm :FormGroup;
  checked: boolean = true;
  produto!: ProductAdd;
  messages: Message[] | undefined;
  
  constructor(private fb: FormBuilder,
    private config: PrimeNGConfig,
     private messageService: MessageService,
    private productService: ProductService,
    private router: Router,
    private location: Location) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      active: [''],
      imageBase64: ['']
    });
  }

  spinner = inject(NgxSpinnerService);

  ngOnInit() {
      this.spinner.show();

      setTimeout(() => {
          this.spinner.hide();
      }, 1000);
  }

  onUpload(event:FileUploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'Files Uploaded', detail: 'Files uploaded'});
  }

  createProduct()
  {
    this.spinner.show();

    if (this.productForm.dirty && this.productForm.valid)
    {
      this.produto = Object.assign({}, this.produto, this.productForm.value);

      this.convertBlobToBase64(this.uploadedFiles);

      this.produto.imageBase64 =  this.base64List[0];
      this.produto.price = CurrencyUtils.IntegerToDecimal(this.produto.price);

      this.productService.addProduct(this.produto)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
      });
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  processarSucesso(response: any) 
  {
      this.productForm.reset();
      if (response.succeeded) 
      {
         this.addSucessMessage();
         this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product created successfully'});
         this.uploadedFiles = [];
      };
    
  }

  processarFalha(fail: any) {

    const errorMessages = fail.error?.messages;

     const detailMessage = Array.isArray(errorMessages) 
     ? errorMessages.map((msg: string) => `- ${msg}`).join('\n') 
     : 'An unexpected error occurred.';

     this.messageService.add({severity: 'error', summary: 'Error', detail: detailMessage});

     this.errors = errorMessages;

     this.addFailMessage();
  }


  convertBlobToBase64(uploads: File[]): void {
    for (let file of uploads) {
      const fileReader = new FileReader();
  
      fileReader.onload = () => {
        const base64String = (fileReader.result as string);
        const base64Content = this.processBase64String(base64String);
  
        this.base64List.push(base64Content);
      };
  
      fileReader.onerror = (error) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to convert file to Base64'});
      };
  
      fileReader.readAsDataURL(file); 
    }
  }

  private processBase64String(base64String: string): string {
    if (base64String.startsWith('data:image')) {
      return base64String.split(',')[1]; // Remove prefix data:image/jpeg;base64
    }
    return base64String;
  }

  addSucessMessage() {
      this.messages = [
          { severity: 'success', summary: 'Product created successfully.' }
      ];
  }

  addFailMessage() {

    const errorMessages = this.errors;

    const detailMessage = Array.isArray(errorMessages) 
    ? errorMessages.map((msg: string) => `- ${msg}`).join('\n') 
    : 'An unexpected error occurred.';

      this.messages = [
          { severity: 'error', summary: 'Failed to create product', detail: detailMessage }
      ];
  }

  backPreviousPage() {
    this.location.back();
  }
}
