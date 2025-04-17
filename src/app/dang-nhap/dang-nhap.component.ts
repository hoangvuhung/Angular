import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dang-nhap',
  imports: [FormsModule],
  templateUrl: './dang-nhap.component.html',
  styleUrl: './dang-nhap.component.css',
})
export class DangNhapComponent {
  user = { email: '', mat_khau: '' };
  thong_bao: string = '';

  constructor(private router: Router) {} // Tiêm Router vào component

  dangnhap() {
    if (!this.user.email || !this.user.mat_khau) {
      this.thong_bao = 'Vui lòng nhập đầy đủ email và mật khẩu!';
      return;
    }

    let opt = {
      method: 'POST',
      body: JSON.stringify(this.user),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:3000/api/dangnhap', opt)
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi HTTP: ' + res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Response từ server:', data);
        if (!data.token) {
          this.thong_bao = data.thong_bao || 'Đăng nhập thất bại!';
          return;
        }

        sessionStorage.setItem('user', JSON.stringify(data.info));
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('expiresIn', data.expiresIn);

        this.thong_bao = 'Đăng nhập thành công!';
        alert('Đăng nhập thành công');
        this.router.navigate(['/']); // Chuyển hướng về trang chủ
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập:', error);
        this.thong_bao = 'Lỗi kết nối đến server!';
      });
  }
}
