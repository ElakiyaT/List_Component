import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-component',
  imports: [CommonModule],
  templateUrl: './data-component.component.html',
  styleUrl: './data-component.component.css'
})
export class DataComponentComponent {
  @Input() items: { text: string }[] = [];
  @Input() size: 'default' | 'small' | 'large' = 'default';
  @Input() split = true;
  }
