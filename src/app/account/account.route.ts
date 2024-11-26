import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const contaRouterConfig: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent }

];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
 })
export class AccountModule { }