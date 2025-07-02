// src/app/config/list-master.config.ts

import { AvatarListItem, avatarListConfig } from './list-avatar.config';
import { ListVerticalItem, listVerticalConfig } from './list-vertical.config';
import { CustomListSettings, CUSTOM_LIST_SETTINGS_1, CUSTOM_LIST_SETTINGS_2 } from './list-grid.config';
import { UserEntry, scrollListConfig } from './scroll-list.config';
import { VirtualListConfig, VIRTUAL_LIST_CONFIG } from './virtual-list.config';

export interface ListMasterConfig {
  title: string;
  type: 'avatar' | 'vertical' | 'grid' | 'scroll' | 'virtual';
  avatarItems?: AvatarListItem[];
  verticalItems?: ListVerticalItem[];
  settings?: CustomListSettings;
  data?: UserEntry[];
  config?: VirtualListConfig;
}

export const LIST_CONFIGS: ListMasterConfig[] = [
  {
    title: 'AVATAR LIST',
    type: 'avatar',
    avatarItems: avatarListConfig.items,
  },
  {
    title: listVerticalConfig.title, //pull title from config
    type: 'vertical',
    verticalItems: listVerticalConfig.items, 
  },
  {
    title: 'GRID LIST 1',
    type: 'grid',
    settings: CUSTOM_LIST_SETTINGS_1,
  },
  {
    title: 'GRID LIST 2',
    type: 'grid',
    settings: CUSTOM_LIST_SETTINGS_2,
  },
  {
    title: scrollListConfig.title,
    type: 'scroll',
    data: scrollListConfig.items,
  },
  {
    title: 'VIRTUAL LIST',
    type: 'virtual',
    config: { ...VIRTUAL_LIST_CONFIG }
  }
];
