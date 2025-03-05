import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MyOrdersComponent } from "./my-orders/my.orders.component";

const contaRouterConfig: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'my-orders', component: MyOrdersComponent },


];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
 })
export class AccountModule { }