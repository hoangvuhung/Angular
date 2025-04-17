import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  form: any = {
    ten_sp: '',
    gia: '',
    hinh: '',
    ngay: '',
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  onSubmit() {
    if (this.form.id) {
      // Sửa
      this.productService
        .updateProduct(this.form.id, this.form)
        .subscribe(() => {
          this.loadProducts();
          this.resetForm();
        });
    } else {
      // Thêm
      this.productService.addProduct(this.form).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: any) {
    this.form = { ...product };
  }

  deleteProduct(id: number) {
    if (confirm('Bạn có chắc chắn muốn xoá không?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  resetForm() {
    this.form = {
      ten_sp: '',
      gia: '',
      hinh: '',
      ngay: '',
    };
  }
}
