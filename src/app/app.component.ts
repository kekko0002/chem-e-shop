import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chemshop';

  // Used to go on top of the page when you route to another page
  scroll(event): void{
    window.scroll(0, 0);
  }

}
