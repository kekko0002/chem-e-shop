import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() backHome: void;

  constructor(private cart: CartService,
              private service: FirebaseService) { }

  getLenght(): number{
   return this.cart.getLenght();
  }

  ngOnInit(): void {
  }

}
