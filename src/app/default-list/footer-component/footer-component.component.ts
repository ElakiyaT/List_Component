import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-component.component.html',
  styleUrl: './footer-component.component.css'
})
export class FooterComponentComponent implements OnInit {
  text = 'Footer';

  @Output() footerReady = new EventEmitter<string>();

  ngOnInit() {
    this.footerReady.emit(this.text);
  }
  @Input() footer: string = '';
  @Input() showPagination: boolean = false;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  onPrevClick() {
    this.prev.emit();
  }

  onNextClick() {
    this.next.emit();
  }

  onPageSelect(page: number) {
    this.pageChange.emit(page);
  }

}
