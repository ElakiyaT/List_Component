import { Component } from '@angular/core';
import { avatarListConfig, AvatarListItem, ListConfig, listConfigs, listItems, listVerticalConfig, ListVerticalItem } from './config/list.config';
import { DefaultListComponent } from './default-list/default-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DefaultListComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listConfigs: ListConfig[] = listConfigs;
  avatarList: AvatarListItem[] = avatarListConfig; // ✅ assign avatar list
  items = listItems;
  verticalList: ListVerticalItem[] = listVerticalConfig;
}
