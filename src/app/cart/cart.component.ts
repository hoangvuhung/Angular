import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICart } from '../cautrucdata';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  listSP: ICart[] = [];
  ngOnInit(): void {
    this.listSP = this.cartService.listSP();
  }
  constructor(public cartService: CartService) {}
  suaSL(id: number, so_luong: number) {
    this.cartService.suaSL(id, so_luong);
    this.listSP = this.cartService.listSP();
  }
  xoaSP(id: number) {
    this.cartService.xoaSP(id);
    this.listSP = this.cartService.listSP();
    return false;
  }
  XoaGH() {
    this.cartService.xoaGH();
    this.listSP = this.cartService.listSP();
  }
}
