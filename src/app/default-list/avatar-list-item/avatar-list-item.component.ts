import { Component, Input } from '@angular/core';
import { AvatarListItem } from '../../config/list-avatar.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-list-item',
  imports: [CommonModule],
  templateUrl: './avatar-list-item.component.html',
  styleUrl: './avatar-list-item.component.css'
})
export class AvatarListItemComponent {
  @Input() item!: AvatarListItem;
  @Input() itemLayout: 'vertical' | 'horizontal' = 'vertical';
  @Input() hasSplit = true;
}
