import { Component } from '@angular/core';
import { ISanPham } from '../../cautrucdata';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-sp-hot',
  imports: [CommonModule],
  templateUrl: './sp-hot.component.html',
  styleUrl: './sp-hot.component.css',
})
export class SpHotComponent {
  constructor(public cartService: CartService) {}
  sp_arr: ISanPham[] = [];
  async ngOnInit() {
    try {
      const response = await fetch('http://localhost:3000/api/sphot/6');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.sp_arr = (await response.json()) as ISanPham[];
    } catch (error) {
      console.error('Lỗi khi fetch sản phẩm hot:', error);
    }
  }
}
