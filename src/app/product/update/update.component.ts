import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ImportsModule } from 'src/app/imports';
import { ProductAdd } from 'src/app/models/product/product.create';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductUpdate } from 'src/app/models/product/product.update';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule,NgxSpinnerComponent],
  providers: [MessageService,ProductService],
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class ProductUpdateComponent implements OnInit{
  uploadedFiles: any[] = [];
  base64List: any[] = [];
  isActive: boolean = false;
  imageUri: string = '';
  productForm :FormGroup;
    
  product!: ProductUpdate;

  constructor(private fb: FormBuilder,
    private config: PrimeNGConfig,
     private messageService: MessageService,
    private productService: ProductService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) {

      this.product = this.route.snapshot.data['product'].data;

  }

  spinner = inject(NgxSpinnerService);

  ngOnInit(): void {

    this.spinner.show();

    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      active: [true],
      imageBase64: ['']
    });

    this.isActive = this.product.active;
    this.imageUri = this.product.imageUri;

    this.productForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      active: this.product.active,
      imageUri: this.product.imageUri
    });

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

  async updatedProduct() {
    if (this.productForm.valid) {

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

      console.log(this.product);
      this.product.price = CurrencyUtils.IntegerToDecimal(this.product.price);
      this.product.id = this.product.productId;
  
      this.productService.updateProduct(this.product).subscribe({
        next: (sucesso: any) => this.processarSucesso(sucesso),
        error: (falha: any) => this.processarFalha(falha),
      });
    }
  }

  processarSucesso(response: any) {
    this.productForm.reset();
    if (response.succeeded) {

      this.spinner.show();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product updated successfully',
      });

      //this.router.navigate(['products/edit/', this.product.id]);
      window.location.reload();
      
      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        active: this.product.active,
        imageUri: this.product.imageUri
      });

    }
  }

  processarFalha(fail: any) {
    // this.errors = fail.error.errors;
    // this.toastr.error('Ocorreu um erro!', 'Opa :(');
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
  
  backPreviousPage() {
    this.router.navigate(['products']);
  }
}
