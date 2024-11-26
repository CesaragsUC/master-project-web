import { Injectable } from "@angular/core";
import { NavMenu } from "src/app/models/menu/menu";

@Injectable({ providedIn: 'root' })
export class MenuService {

    public cartItem: NavMenu[] = [
        {
            label: '',
            icon: 'pi pi-cart-minus text-3xl',
            badge: '3',
            exact: true,
            active: true
        }];
    
     public profileItem: NavMenu[]= [
          {
            separator: true,
          },
          {
              label: 'My Account',
              items: [
                  { label: 'Wish List', icon: 'pi pi-heart', shortcut: '⌘+N' },
                  { label: 'My Orders', icon: 'pi pi-list', shortcut: '⌘+S',url: 'products' },
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
          label: 'Cart',
          icon: 'pi pi-cart-minus',
          badge: '3',
          url: ''
        },
        {
            label: 'Admin Area',
            icon: 'pi pi-objects-column'
        },
        {
            label: 'Account',
            icon: 'pi pi-user',
            items: [
              { label: 'Wish List', icon: 'pi pi-heart', url: ''},
              { label: 'My Orders', icon: 'pi pi-list', url: 'products' },
              { label: 'My Coupons', icon: 'pi pi-ticket',url: 'products' },
              { label: 'Profile', icon: 'pi pi-cog',  url: '' },
              { label: 'Notifications', icon: 'pi pi-bell', badge: '2', url: '' },
              { label: 'Logout', icon: 'pi pi-sign-out', url: '' }
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
}
