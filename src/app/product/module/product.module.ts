import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductUpdateComponent } from "../update/update.component";
import { ProductListComponent } from "../list/list.component";
import { ProductDetailsComponent } from "../details/details.component";
import { ProductAddComponent } from "../add/add.component";
import { ProductResolve } from "./product.resolve";

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'list', component: ProductListComponent },
    { path: 'edit/:id', component: ProductUpdateComponent,
      resolve: {
        product: ProductResolve
    }
     },
    { path: 'details/:id', component: ProductDetailsComponent,
      resolve: {
        product: ProductResolve
    }
     },
    { path: 'add', component: ProductAddComponent }
  ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes) // Define as rotas internas
    ],
    providers: [ProductResolve],
  })
export class ProductModule { }