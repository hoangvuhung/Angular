import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './trangchu/header/header.component';
import { ThanhmenuComponent } from './trangchu/thanhmenu/thanhmenu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ThanhmenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-first-angular-app';
}
