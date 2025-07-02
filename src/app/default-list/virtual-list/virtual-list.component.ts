import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AntUser, VirtualListConfig } from '../../config/virtual-list.config';

@Component({
  selector: 'app-virtual-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-list.component.html',
  styleUrl: './virtual-list.component.css'
})
export class VirtualListComponent {
  @Input() users: AntUser[] = []; 
  @Input() config!: VirtualListConfig;
}
