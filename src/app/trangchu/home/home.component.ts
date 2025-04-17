import { Component } from '@angular/core';
import { SpHotComponent } from '../sp-hot/sp-hot.component';
import { SpMoiComponent } from '../sp-moi/sp-moi.component';

@Component({
  selector: 'app-home',
  imports: [SpHotComponent, SpMoiComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
