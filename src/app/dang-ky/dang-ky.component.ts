// lab 4
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dang-ky',
  imports: [CommonModule, FormsModule],
  templateUrl: './dang-ky.component.html',
  styleUrl: './dang-ky.component.css',
})
export class DangKyComponent {
  user = { email: '', mat_khau: '', go_lai_mat_khau: '', ho_ten: '' };
  thong_bao: string = '';

  dangky() {
    if (this.user.email == '') {
      this.thong_bao = 'Chưa nhập email mà';
      return;
    }
    let opt = {
      method: 'post',
      body: JSON.stringify(this.user),
      headers: { 'Content-type': 'application/json' },
    };
    fetch('http://localhost:3000/api/dangky', opt)
      .then((res) => res.json())
      .then((data) => {
        this.thong_bao = data.thong_bao;
      });
  }
}
