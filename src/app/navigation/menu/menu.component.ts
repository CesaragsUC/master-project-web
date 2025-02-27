import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ImportsModule } from 'src/app/imports';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MenuService } from '../../services/menu/menu.service';
import { NavMenu } from 'src/app/models/menu/menu';
import { LocalStorageData } from 'src/app/utils/localstorage';
import { AuthService } from 'src/app/services/account/auth.service';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/basket/cart.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ImportsModule],
  providers: [
    MenuService,
    AuthService
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean>;   
  isResponsive: boolean = false;
  hideSideMenu = false;
  isAdmin:boolean = false;
  isUserLogged:boolean = false;
  token: any;
  user: any;
  email: string = "";


  cartItem: NavMenu[] | undefined;
  profileItem: NavMenu[] | undefined;
  adminMenu: NavMenu[] | undefined;
  responsiveItems: NavMenu[] | undefined;
  menuItems: NavMenu[] | undefined;
  accountItens: NavMenu[] | undefined;
  menuHome: NavMenu[] | undefined;
  menuLogin: NavMenu[] | undefined;
  realTimeData: number;
  localStorage = new LocalStorageData();
  totalItens: number = 0;
  
  constructor(private responsive: BreakpointObserver,
    private menuService: MenuService,
    private authService: AuthService,
    private cartService: CartService) 
  {
    this.syncCartItemBadge();
  }
  
  ngOnInit(): void {

    this.profileItem = this.menuService.profileItem;
    this.menuLogin = this.menuService.menuLogin;
    this.responsiveItems = this.menuService.responsiveItems;
    this.adminMenu = this.menuService.adminMenu;
    this.menuHome = this.menuService.menuHome;
    this.menuItems = this.menuService.menuItems = [...this.menuService.adminMenu];

    this.responsive
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe((result) => {

      this.isResponsive = result.matches;
      
      if (this.isResponsive) 
      {
        if(this.isLoggedIn)
          this.adminMenu = [...this.responsiveItems];
        else
          this.adminMenu = [...this.menuHome,...this.menuLogin];
      }
      else
      {
        if(this.isLoggedIn)
          this.adminMenu = this.menuService.adminMenu;
        else
          this.menuItems = [...this.menuHome];
      }
       //console.log('responsive', this.isResponsive);
    });

  }

  get isLoggedIn(): boolean {
    return this.authService.checkLoginStatus();
  }


  onAvatarClick(event: Event, overlayPanel: OverlayPanel) {
      overlayPanel.toggle(event);
  }

  logout() {
    this.localStorage.clearLocaluserData();
    return this.authService.logout();
  }

  syncCartItemBadge() {
    
    //https://angular.dev/guide/signals
    effect(() => {

      this.totalItens = this.cartService.noOfItemsInCart() <= 0 ? 
      this.cartService.totalItenInCart() :
      this.cartService.noOfItemsInCart();

      this.cartItem = [
          {
              ...this.menuService.cartItem[0],
              badge: this.totalItens > 0 ? this.totalItens.toString() : ''
          }
      ];
     });
  }
}