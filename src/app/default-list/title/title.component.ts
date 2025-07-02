
//import { VirtualListConfig } from '../default-list/default-list.component';

import { Component, Input } from "@angular/core";
import { AvatarListConfig, AvatarListItem } from "../../config/list-avatar.config";
import { ListVerticalItem } from "../../config/list-vertical.config";
import { CustomListSettings } from "../../config/list-grid.config";
import { VirtualListConfig } from "../../config/virtual-list.config";
import { UserEntry } from "../../config/scroll-list.config";



@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input() avatarItems?: AvatarListItem[];
  @Input() verticalItems?: ListVerticalItem[];
  @Input() settings?: CustomListSettings;
  @Input() data?: UserEntry[];
  @Input() verticalConfig?: { title: string };

  //@Input() config?: VirtualListConfig;
  @Input() title?: string; // optional override
  @Input() config?: VirtualListConfig;
  @Input() avatarConfig?: AvatarListConfig;
  @Input() listconfig?: { title?: string }; 

  resolvedTitle = '';

  ngOnInit(): void {
    if (this.listconfig?.title) {
      this.resolvedTitle = this.listconfig.title;
    }else if (this.avatarConfig?.title) {
      this.resolvedTitle = this.avatarConfig.title;
    } else if (this.verticalConfig?.title) {
      this.resolvedTitle = this.verticalConfig.title;
    } else if (this.settings?.title) {
      this.resolvedTitle = this.settings.title;
    }  else if (this.title) {
      this.resolvedTitle = this.title;
    } else if (this.config?.title) {
      this.resolvedTitle = this.config.title; 
    } 
    else {
      this.resolvedTitle = 'UNKNOWN LIST';
    }
    
  }
}