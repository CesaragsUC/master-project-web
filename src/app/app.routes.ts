import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './errors/notfound/page.notfound.component';
import { LoginComponent } from './account/login/login.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {
        path: 'products',
        loadChildren: () => import('./product/module/product.module') //lazy loading
         .then(m => m.ProdutoModule),
    },
    {
      path:'account', 
      loadChildren: () => import('./account/account.route') //lazy loading
      .then(m => m.AccountModule),
    },
    {
        path: '**', component: NotFoundComponent 
    } 
];
