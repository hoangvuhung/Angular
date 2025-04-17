import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './trangchu/home/home.component';
import { DangKyComponent } from './dang-ky/dang-ky.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { LienHeComponent } from './lien-he/lien-he.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpTrongLoaiComponent } from './trangchu/sp-trong-loai/sp-trong-loai.component';
import { SpComponent } from './trangchu/sp/sp.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Trang chủ' },
  { path: 'dang-ky', component: DangKyComponent, title: 'Đăng ký thành viên' },
  { path: 'dang-nhap', component: DangNhapComponent, title: 'Đăng nhập' },
  { path: 'lien-he', component: LienHeComponent, title: 'Liên hệ' },
  { path: 'sptrongloai/:id', component: SpTrongLoaiComponent },
  { path: 'sp/:id', component: SpComponent },
  { path: 'gio-hang', component: CartComponent, title: 'Giỏ hàng' },
  { path: 'admin', component: AdminComponent, title: 'Admin' },
  {
    path: 'loginadmin',
    component: LoginadminComponent,
    title: 'Đăng Nhập admin',
  },
  { path: '**', component: NotFoundComponent, title: 'Không tìm thấy' },
];
