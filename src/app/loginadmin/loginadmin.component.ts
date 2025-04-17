import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './loginadmin.component.html',
})
export class LoginadminComponent {
  constructor(private router: Router) {}
  user = { email: '', mat_khau: '' };
  thong_bao: string = '';
  dangnhap() {
    if (this.user.email == '') {
      this.thong_bao = 'Chưa nhập email mà';
      return;
    }
    let opt = {
      method: 'post',
      body: JSON.stringify(this.user),
      headers: { 'Content-type': 'application/json' },
    };
    fetch('http://localhost:3000/api/dangnhapadmin', opt)
      .then((res) => res.json())
      .then((data) => {
        if (data.thong_bao != undefined)
          return (this.thong_bao = data.thong_bao);
        let expiresIn = data.expiresIn; //"1h"
        let user = data.info;
        let token = data.token;
        //{"id": 2, "ho_ten": "AA", "email": "aa@aa", "vai_tro":1}
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('expiresIn', expiresIn);
        this.thong_bao = 'Đăng nhập thành công';
        let redirectUrl = sessionStorage.getItem('redirectUrl') || '/'; //trang cũ hoặc trang chú
        sessionStorage.removeItem('redirectUrl');
        setTimeout(() => this.router.navigate([redirectUrl]), 3000);
      });
  } // dangnhap
}
