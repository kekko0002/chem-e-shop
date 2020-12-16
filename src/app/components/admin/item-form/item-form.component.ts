import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';

// Form component created for reusable template in admin component
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() product: Product;
  @Input() categories: Category;

  constructor() { }

  ngOnInit(): void {
  }


}
