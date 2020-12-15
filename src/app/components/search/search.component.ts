import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  @Input() submitted: boolean;
  value: string;
  @Output() res = new EventEmitter();

  constructor() { }

  resetDashboard(): void{
    this.res.emit();
  }

  userInput(value: string): void{
    this.search.emit(value);
    this.value = '';
  }

  ngOnInit(): void {
  }

}
