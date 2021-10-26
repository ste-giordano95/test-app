import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
  .container{
    background-image: url("assets/wallpapers.jpg");
    background-repeat: no-repeat;
    background-position: center; /* Center the image */
    background-size: cover; /* Resize the background image to cover the entire container */
  }
  `]
})
export class AppComponent {
  title = 'test-app';
}
