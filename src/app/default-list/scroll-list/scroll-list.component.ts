import { Component, Input } from '@angular/core';
import { UserEntry } from '../../config/scroll-list.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-list',
  imports: [CommonModule],
  templateUrl: './scroll-list.component.html',
  styleUrl: './scroll-list.component.css'
})
export class ScrollListComponent {
  @Input() item!: UserEntry;
}
