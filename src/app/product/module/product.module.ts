import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductUpdateComponent } from "../update/update.component";
import { ProductListComponent } from "../list/list.component";
import { ProductDetailsComponent } from "../details/details.component";
import { ProductAddComponent } from "../add/add.component";
import { ProductDeleteComponent } from "../delete/delete.component";

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'list', component: ProductListComponent },
    { path: 'edit/:id', component: ProductUpdateComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'add', component: ProductAddComponent },
    { path: 'delete/:id', component: ProductDeleteComponent }
  ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes) // Define as rotas internas
    ]
  })
export class ProdutoModule { }