import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ImportsModule } from 'src/app/imports';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ImportsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  
  isResponsive: boolean = false;
  hideSideMenu = false;

  cartItem: MenuItem[] | undefined;
  profileItem: MenuItem[] | undefined;
  mainItems: MenuItem[] | undefined;
  responsiveItems: MenuItem[] | undefined;
  menuItems: MenuItem[] = [
    {
        label: '', // Item vazio
        styleClass: 'hidden-item', // Classe para esconder
    },
  ];

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {

    this.profileItem = [
      {
        separator: true
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
                { label: 'Notifications', icon: 'pi pi-bell', badge: '2', url: '' },
                { label: 'Logout', icon: 'pi pi-sign-out', shortcut: '⌘+Q' }
            ]
        },
        {
            separator: true
        }
      ];

      this.cartItem = [
          {
              label: '',
              icon: 'pi pi-cart-minus text-3xl',
              badge: '3'
          }
      ];

      this.responsiveItems = [
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

        this.mainItems = [
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

    this.menuItems = [...this.mainItems];

    this.responsive
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe((result) => {
      this.isResponsive = result.matches;
      
      if (this.isResponsive) {
        this.menuItems = [...this.responsiveItems];
      }else{
        this.menuItems = [...this.mainItems];
      }
      console.log('Modo Responsivo:', this.isResponsive);
      
    });
  }


  onAvatarClick(event: Event, overlayPanel: OverlayPanel) {
      overlayPanel.toggle(event);
  }

  onOptionSelect(option: string) {
      console.log('Option selected:', option);
      // Implement your logic based on the selected option
  }

  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true,
      admin: false
    },
    {
      link: '/cadastro',
      name: 'Cadastro',
      exact: true,
      admin: false
    },
    {
      link: '/sobre',
      name: 'Sobre',
      exact: false,
      admin: false
    },
    {
      link: '/produtos',
      name: 'Produtos',
      exact: false,
      admin: false
    },
    {
      link: '/filmes',
      name: 'Filmes',
      exact: false,
      admin: false
    },
    {
      link: '/admin',
      name: 'Admin',
      exact: false,
      admin: false
    },
    {
      link: '/superadmin',
      name: 'Super Admin',
      exact: false,
      admin: true
    }
  ];

  isAdmin:boolean = false;
  
  adminNavItens: Nav[] = this.nav.filter(item => item.admin);

  defautNavItens: Nav[] = this.nav.filter(item => !item.admin);

  // Função para gerar um booleano aleatório
  getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

}


interface Nav {
  link: string;
  name: string;
  exact: boolean;
  admin: boolean;
}