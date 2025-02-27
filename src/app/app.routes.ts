import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './errors/notfound/page.notfound.component';
import { LoginComponent } from './account/login/login.component';
import { isAdminCanMatchGuard, isLogged } from 'src/guards/auth.guards';
import { AccessDeniedComponent } from './errors/deny/deny.access.component';
import { AdminCanMatchGuard } from 'src/guards/admin/admin.can.match.guards';
import { IsAdminCanActivateGuard } from 'src/guards/admin/admin.can.active.guards';
import { IsAdminCanActivateChildGuard } from 'src/guards/admin/admin.can.active.child.guards';
import { IsAdminCanLoadGuard } from 'src/guards/admin/admin.can.load.guards';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {
        path: 'products',
        loadChildren: () => import('./product/module/product.module') //lazy loading
         .then(m => m.ProductModule),
         canMatch: [AdminCanMatchGuard], // canMatch verifica se o usuário tem permissão para acessar a rota
         canActivate: [IsAdminCanActivateGuard, isLogged] ,
         canActivateChild: [IsAdminCanActivateChildGuard, isLogged], //canActivateChild verifica se o usuário tem permissão para acessar as rotas filhas
         canLoad: [IsAdminCanLoadGuard, isLogged ],
    },
    {
      path:'account', 
      loadChildren: () => import('./account/account.route') //lazy loading
      .then(m => m.AccountModule),
    },
    {
        path:'cart', 
        loadChildren: () => import('./basket/module/cart.module') //lazy loading
        .then(m => m.CartModule),
    },
    {
        path: 'access-denied',
        component: AccessDeniedComponent, // Sua página de acesso negado
    },
    {
        path: '**', component: NotFoundComponent 
    } 
];
