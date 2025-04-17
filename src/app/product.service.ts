import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/sphot'; // sửa nếu khác

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
}
