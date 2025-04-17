import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ISanPham } from '../../cautrucdata';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-sp',
  imports: [CommonModule],
  templateUrl: './sp.component.html',
  styleUrl: './sp.component.css',
})
export class SpComponent {
  constructor(private route: ActivatedRoute, public cartService: CartService) {}

  id: number = 0;
  sp: ISanPham = {} as ISanPham;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    fetch(`http://localhost:3000/api/sp/${this.id}`)
      .then((res) => res.json())
      .then((data) => (this.sp = data as ISanPham))
      .catch((error) => console.error('Lỗi khi fetch SP Hot:', error));
  }
}
