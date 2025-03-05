import { inject, Injectable } from "@angular/core";
import { NavMenu } from "src/app/models/menu/menu";
import { LocalStorageData } from "src/app/utils/localstorage";
import { AuthService } from "../account/auth.service";

@Injectable({ providedIn: 'root' })
export class MenuService {

    localStorage = new LocalStorageData();
    authService = inject(AuthService);

    private cartCount = 0;

        getCartCount() {
            return this.cartCount;
        }

        addToCart() {
            this.cartCount++;
            this.updateCartBadge();
        }

        updateCartBadge() {
            this.cartItem[0].badge = this.cartCount.toString(); // Atualiza o badge no menu
        }

    public cartItem: NavMenu[] = [
    {
            label: '',
            icon: 'pi pi-cart-minus text-3xl',
            badge: '0',
            url: 'cart/details'
    }];
    
     public profileItem: NavMenu[]= [
          {
            separator: true,
          },
          {
              label: 'My Account',
              items: [
                  { label: 'Wish List', icon: 'pi pi-heart', shortcut: '⌘+N' },
                  { label: 'My Orders', icon: 'pi pi-list', shortcut: '⌘+S',url: '/account/my-orders' },
                  { label: 'My Coupons', icon: 'pi pi-ticket', shortcut: '⌘+S',url: 'products' },
              ]
          },
          {
              label: 'Configurations',
              items: [
                  { label: 'Profile', icon: 'pi pi-cog', shortcut: '⌘+O' },
                  { label: 'Notifications', icon: 'pi pi-bell', badge: '2', url: '' }
              ]
          },
          {
              separator: true
          }
    ];
    
    public adminMenu: NavMenu[] = 
    [
        {
             label: 'Home',
             icon: 'pi pi-home',
             url: 'home'
         },
         {
             label: 'Admin Area',
             icon: 'pi pi-objects-column',
             items: [
             { label: 'Orders', icon: 'pi pi-box', url: ''},
             { label: 'Products', icon: 'pi pi-list', url: 'products' },
             { label: 'Payments', icon: 'pi pi-money-bill',url: '' },
             { label: 'Shipments', icon: 'pi pi-truck',  url: '' },
             { label: 'Customers', icon: 'pi pi-users', url: '' },
             { label: 'Charts', icon: 'pi pi-gauge', url: '' }
             ]
         }
    ];
    
    public responsiveItems: NavMenu[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: 'home'
        },
        {
            label: 'Admin Area',
            icon: 'pi pi-objects-column',
            items: [
            { label: 'Orders', icon: 'pi pi-box', url: ''},
            { label: 'Products', icon: 'pi pi-list', url: 'products' },
            { label: 'Payments', icon: 'pi pi-money-bill',url: '' },
            { label: 'Shipments', icon: 'pi pi-truck',  url: '' },
            { label: 'Customers', icon: 'pi pi-users', url: '' },
            { label: 'Charts', icon: 'pi pi-gauge', url: '' }
            ]
        },
        {
            label: 'Account',
            icon: 'pi pi-user',
            items: [
              { label: 'Wish List', icon: 'pi pi-heart', url: ''},
              { label: 'My Orders', icon: 'pi pi-list', url: '/account/my-orders' },
              { label: 'My Coupons', icon: 'pi pi-ticket',url: 'products' },
              { label: 'Profile', icon: 'pi pi-cog',  url: '' },
              { label: 'Notifications', icon: 'pi pi-bell', badge: '2', url: '' },
              { label: 'Logout', icon: 'pi pi-sign-out', url: '', command: () => this.logout() }
            ]
        }
    ];
    
    public menuItems: NavMenu[] = [
      {
          label: '', 
          styleClass: 'hidden-item',
      }
    ];

    public menuLogin: NavMenu[] = [
        {
            label: 'Login',
            url: 'account/login'
        }
    ];

    public menuHome: NavMenu[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: 'home'
        }
    ];

    logout() {
        this.localStorage.clearLocaluserData();
        return this.authService.logout();
      }
}
