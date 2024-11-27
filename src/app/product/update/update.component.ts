import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ImportsModule } from 'src/app/imports';
import { ProductAdd } from 'src/app/models/product/product.create';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  standalone: true,
  imports: [CommonModule,ImportsModule],
  providers: [MessageService,ProductService],
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class ProductUpdateComponent {
  uploadedFiles: any[] = [];
  base64List: any[] = [];

  productForm :FormGroup;
    
  produto!: ProductAdd;

  constructor(private fb: FormBuilder,
    private config: PrimeNGConfig,
     private messageService: MessageService,
    private productService: ProductService,
    private location: Location) {

    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      active: [true],
      imageBase64: ['']
    });
  }

  onUpload(event:FileUploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'Files Uploaded', detail: 'Files uploaded'});
  }

  createProduct()
  {
    if (this.productForm.dirty && this.productForm.valid)
    {
      this.produto = Object.assign({}, this.produto, this.productForm.value);

      this.convertBlobToBase64(this.uploadedFiles);
      const base64 =  this.base64List[0];

      this.produto.price = CurrencyUtils.StringToDecimal(this.produto.price);

      this.productService.addProduct(this.produto)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
      });
    }
  }

  processarSucesso(response: any) {
    // this.produtoForm.reset();
    // this.errors = [];

    // let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    // if (toast) {
    //   toast.onHidden.subscribe(() => {
    //     this.router.navigate(['/produtos/listar-todos']);
    //   });
    // }
  }

  processarFalha(fail: any) {
    // this.errors = fail.error.errors;
    // this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }


  convertBlobToBase64(uploads: File[]): void {
    for (let file of uploads) {
      const fileReader = new FileReader();
  
      fileReader.onload = () => {
        this.base64List.push(fileReader.result as string);
      };
  
      fileReader.onerror = (error) => {
        //more info: https://stackblitz.com/run?file=src%2Fapp%2Ftoast-severity-demo.ts
        this.messageService.add({severity: 'danger', summary: 'Failed', detail: 'Failed to convert file to Base64'});
      };
  
      fileReader.readAsDataURL(file); 
    }
  }
  
  backPreviousPage() {
    this.location.back();
  }
}
