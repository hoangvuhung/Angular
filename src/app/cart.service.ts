import { Injectable } from '@angular/core';
import { ISanPham, ICart } from './cautrucdata';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Kiểm tra môi trường trước khi truy cập localStorage
  private getCart(): ICart[] {
    if (typeof window === 'undefined') return []; // Nếu là SSR, trả về mảng rỗng tránh lỗi
    return JSON.parse(localStorage.getItem('cart') || '[]') as ICart[];
  }

  private saveCart(cart: ICart[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  themVaoGio(sp: ISanPham) {
    let sp_arr = this.getCart();
    let index = sp_arr.findIndex((s) => s.id === sp.id);

    if (index >= 0) {
      sp_arr[index].so_luong++;
    } else {
      let c: ICart = {
        id: sp.id,
        ten_sp: sp.ten_sp,
        gia_mua: sp.gia_km,
        hinh: sp.hinh,
        so_luong: 1,
      };
      sp_arr.push(c);
    }

    this.saveCart(sp_arr);
    console.log('Đã thêm sản phẩm');
    alert(`Đã thêm "${sp.ten_sp}" vào giỏ hàng!`);
  }

  listSP(): ICart[] {
    return this.getCart();
  }

  suaSL(id: number, so_luong: number): void {
    let sp_arr = this.getCart();
    let index = sp_arr.findIndex((sp) => sp.id === id);

    if (index !== -1) {
      if (so_luong > 0) {
        sp_arr[index].so_luong = so_luong;
      } else {
        sp_arr.splice(index, 1); // Nếu số lượng <= 0 thì xóa sản phẩm
      }
      this.saveCart(sp_arr);
    }
  }

  xoaSP(id: number): void {
    let sp_arr = this.getCart().filter((sp) => sp.id !== id);
    this.saveCart(sp_arr);
  }

  xoaGH(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  }
}
