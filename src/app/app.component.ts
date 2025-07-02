import { Component } from '@angular/core';
import { ListConfig, listConfigs} from './config/list.config';
import { DefaultListComponent } from './default-list/default-list.component';
import { CommonModule } from '@angular/common';
import { avatarListConfig, AvatarListItem } from './config/list-avatar.config';
import { listVerticalConfig, ListVerticalItem } from './config/list-vertical.config';
import { CUSTOM_LIST_SETTINGS_1, CUSTOM_LIST_SETTINGS_2 } from './config/list-grid.config';
//import { USER_ENTRIES } from './config/scroll-list.config';
import { TitleComponent } from './default-list/title/title.component';
import { VIRTUAL_LIST_CONFIG } from './config/virtual-list.config';
import { LIST_CONFIGS } from './config/list-master.config';
import { scrollListConfig } from './config/scroll-list.config';

@Component({
  selector: 'app-root',
  imports: [CommonModule,TitleComponent,DefaultListComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listConfigs: ListConfig[] = listConfigs;
  avatarTitleConfig = avatarListConfig;
  avatarList: AvatarListItem[] = avatarListConfig.items; 
  verticalList = listVerticalConfig.items;
  verticalTitleConfig = listVerticalConfig;
  listSettings1 = CUSTOM_LIST_SETTINGS_1;
  listSettings2 = CUSTOM_LIST_SETTINGS_2;
  users = scrollListConfig.items;
  scrollTitleConfig = scrollListConfig;
  showVirtualList = true;
  virtualListConfig = VIRTUAL_LIST_CONFIG;
  listConfigss = LIST_CONFIGS;
}
