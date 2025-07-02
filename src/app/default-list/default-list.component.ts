// src/app/default-list/default-list.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarListItem, ListItem, ListVerticalItem } from '../config/list.config';

@Component({
  selector: 'app-default-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-list.component.html',
  styleUrl: './default-list.component.css'
})
export class DefaultListComponent {
  @Input() items: { text: string }[] = [];
  @Input() size: 'default' | 'small' | 'large' = 'default';
  @Input() header = '';
  @Input() footer = '';
  @Input() title = '';
  @Input() bordered = false;
  @Input() split = true;
  @Input() avatarItems: AvatarListItem[] = [];
  @Input() listItems: ListItem[] = [];       // new detailed list items
  @Input() verticalItems: ListVerticalItem[] = []; // ✅ Add this
  @Input() pagination: boolean | { pageSize: number } = false;


  get isAvatarList(): boolean {
    return this.avatarItems && this.avatarItems.length > 0;
  }

  currentPage = 1;

  get isVerticalList(): boolean {
    return this.verticalItems && this.verticalItems.length > 0;
  }

  get pageSize(): number {
    return typeof this.pagination === 'object' ? this.pagination.pageSize : 3;
  }

  get totalPages(): number {
    return Math.ceil(this.verticalItems.length / this.pageSize);
  }

  get showPagination(): boolean {
    return !!this.pagination;
  }

  paginatedItems(): ListVerticalItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.verticalItems.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
