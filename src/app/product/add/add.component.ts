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
  product!: ProductAdd;
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

  async createProduct()
  {
    this.spinner.show();

    if (this.productForm.dirty && this.productForm.valid)
    {
      this.product = Object.assign({}, this.product, this.productForm.value);

      try {
        const base64List = await this.convertBlobToBase64(this.uploadedFiles);
        const base64 = base64List[0]; 
        this.product.imageBase64 = base64;
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Failed to convert file to Base64',
        });
        return; 
      }

      this.product.price = CurrencyUtils.IntegerToDecimal(this.product.price);

      this.productService.addProduct(this.product)
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


  convertBlobToBase64(uploads: File[]): Promise<string[]> {
    const promises = uploads.map(file => {
      return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const base64String = fileReader.result as string;
          const base64Content = this.processBase64String(base64String);
          resolve(base64Content);
        };
        fileReader.onerror = (error) => {
          reject('Failed to convert file to Base64');
        };
        fileReader.readAsDataURL(file);
      });
    });
  
    return Promise.all(promises); // Aguarda todos os arquivos serem convertidos
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
