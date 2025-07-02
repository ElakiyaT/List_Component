import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent implements OnInit {
  text = 'Header';

  @Output() headerReady = new EventEmitter<string>();

  ngOnInit() {
    this.headerReady.emit(this.text);
  }
}
