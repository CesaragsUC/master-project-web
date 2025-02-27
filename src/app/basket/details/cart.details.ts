import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImportsModule } from "src/app/imports";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImportsModule
  ],
  providers: [],
  selector: 'app-details',
  templateUrl: './cart.details.html',
  styleUrl: './cart.details.css'
})
export class CartDetailsComponent {
}