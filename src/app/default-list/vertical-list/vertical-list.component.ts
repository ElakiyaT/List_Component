import { Component, Input } from '@angular/core';
import { ListVerticalItem } from '../../config/list-vertical.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertical-list',
  imports: [CommonModule],
  templateUrl: './vertical-list.component.html',
  styleUrl: './vertical-list.component.css'
})
export class VerticalListComponent {
  @Input() items: ListVerticalItem[] = [];
  @Input() split: boolean = true;
  @Input() itemLayout: 'vertical' | 'horizontal' = 'vertical';
  
}
