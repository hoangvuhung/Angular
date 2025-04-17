import { Component } from '@angular/core';
import { ISanPham } from '../../cautrucdata';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sp-moi',
  imports: [CommonModule],
  templateUrl: './sp-moi.component.html',
  styleUrl: './sp-moi.component.css',
})
export class SpMoiComponent {
  sp_arr: ISanPham[] = [];
  async ngOnInit() {
    try {
      const response = await fetch('http://localhost:3000/api/spmoi/3');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.sp_arr = (await response.json()) as ISanPham[];
    } catch (error) {
      console.error('Lỗi khi fetch sản phẩm mới:', error);
    }
  }
}
