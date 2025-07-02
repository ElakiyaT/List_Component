// src/app/default-list/default-list.component.ts

import { Component, computed, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { AvatarListItem } from '../config/list-avatar.config';
import { ListVerticalItem } from '../config/list-vertical.config';
import { CustomListSettings, GridSettings, ListItem } from '../config/list-grid.config';
import { UserEntry } from '../config/scroll-list.config';
import { AntUser, VIRTUAL_LIST_CONFIG, VirtualListConfig } from '../config/virtual-list.config';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { DataComponentComponent } from './data-component/data-component.component';
import { AvatarListItemComponent } from './avatar-list-item/avatar-list-item.component';
import { VerticalListComponent } from './vertical-list/vertical-list.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ScrollListComponent } from './scroll-list/scroll-list.component';
import { VirtualListComponent } from './virtual-list/virtual-list.component';

@Component({
  selector: 'app-default-list',
  standalone: true,
  imports: [CommonModule,HeaderComponentComponent,FooterComponentComponent, DataComponentComponent, AvatarListItemComponent, VerticalListComponent,GridListComponent,ScrollListComponent,VirtualListComponent],
  templateUrl: './default-list.component.html',
  styleUrl: './default-list.component.css',
})

export class DefaultListComponent implements OnInit, OnDestroy {
  
  @Input() items: { text: string }[] = [];
  @Input() size: 'default' | 'small' | 'large' = 'default';
  @Input() header = '';
  @Input() footer = '';
  @Input() title = '';
  @Input() bordered = false;
  @Input() split = true;
  @Input() avatarItems: AvatarListItem[] = [];
  @Input() listItems: ListItem[] = [];
  @Input() verticalItems: ListVerticalItem[] = [];
  @Input() pagination: boolean | { pageSize: number } = false;
  @Input() itemLayout: 'vertical' | 'horizontal' = 'vertical';
  @Input() settings!: CustomListSettings;
  @Input() data: UserEntry[] = [];
  @Input() config!: VirtualListConfig;

  headerText = '';
  footerText = '';

  onHeaderMessage(text: string) {
    this.headerText = text;
  }

  onFooterMessage(text: string) {
    this.footerText = text;
  }

  virtualListConfig = VIRTUAL_LIST_CONFIG;
  @Input() scrollConfig?: { endMessage?: string };
  

  get endMessage(): string {
    return this.scrollConfig?.endMessage || '';
  }
  

  get mode(): 'simple' | 'avatar' | 'vertical' | 'grid' | 'scroll' | 'virtual' {
    if (this.avatarItems?.length) return 'avatar';
    if (this.verticalItems?.length) return 'vertical';
    if (this.settings?.items?.length) return 'grid';
    if (this.data?.length) return 'scroll';
    if (this.users?.length) return 'virtual';
    if (this.items?.length) return 'simple';
    return 'simple';
  }
  
  users: AntUser[] = [];
  currentPage = 1;
  isFetching = false;
  showNotification = false;

  private toastTimeoutId: any;
  private loadTimeoutId: any;
  private httpSub: Subscription | null = null;

  visibleItems: UserEntry[] = [];
  batchSize = 10;
  currentIndex = 0;
  loading = false;

  private readonly DEFAULT_MAX_USERS = 1000;
  private readonly DEFAULT_DELAY_MS = 1000;

  private _paginatedItems: ListVerticalItem[] = [];
  private _totalPages = 0;
  private _lastVerticalItemsLength: number | undefined;
  private _lastPageSize: number | undefined;
  private _lastCurrentPage: number | undefined;


  constructor(private http: HttpClient,
    private userService: UserService,
     @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.resolveActiveDataSource();
    this.loadMore();
    this.updatePaginationCache();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Safe config check AFTER input is initialized
    if (changes['config'] && this.config && isPlatformBrowser(this.platformId)) {
      if (!this.config.apiUrl || !this.config.pageSize) {
        console.error('VirtualListConfig is missing required properties.');
        return;
      }
  
      this.users = [];
      this.currentPage = 1;
      this.fetchNextPage(false);
    }
  
    if (
      changes['verticalItems'] ||
      changes['data'] ||
      changes['items'] ||
      changes['avatarItems']
    ) {
      this.resolveActiveDataSource();
      this.updatePaginationCache();
    }
  }
  

  private resolveActiveDataSource(): void {
    const sources = {
      verticalItems: this.verticalItems?.length || 0,
      data: this.data?.length || 0,
      users: this.users?.length || 0,
    };

    const activeSources = Object.entries(sources).filter(([_, len]) => len > 0);

    if (activeSources.length > 1) {
      console.warn(
        ` Multiple data sources active (${activeSources
          .map(([key]) => key)
          .join(', ')}). Keeping only highest priority.`
      );
    }

    if (this.users.length > 0) {
      this.resetOtherSources('users');
    } else if (this.data.length > 0) {
      this.resetOtherSources('data');
    } else if (this.verticalItems.length > 0) {
      this.resetOtherSources('verticalItems');
    }
  }

  private resetOtherSources(active: 'users' | 'data' | 'verticalItems'): void {
    if (active !== 'users') this.users = [];
    if (active !== 'data') {
      this.data = [];
      this.visibleItems = [];
      this.currentIndex = 0;
    }
    if (active !== 'verticalItems') this.verticalItems = [];
  }

  fetchNextPage(showToast: boolean = true): void {
    if (this.isFetching || !this.config?.apiUrl) return;
  
    this.isFetching = true;
  
    if (this.currentPage === 1) {
      this.userService.fetchUsers(this.config.apiUrl).subscribe({
        next: res => {
          this.users = res;
          this.currentPage++;
          this.showNotification = showToast;
          this.hideToastAfterDelay();
          this.isFetching = false;
        },
        error: err => {
          console.error('Error fetching users:', err);
          this.isFetching = false;
        }
      });
    } else {
      const count = this.config?.pageSize ?? 5;
      this.userService.generateFakeUsers(this.users.length, count).subscribe({
        next: fakeUsers => {
          this.users = [...this.users, ...fakeUsers];
          this.currentPage++;
          this.showNotification = showToast;
          this.hideToastAfterDelay();
        },
        error: err => {
          console.error('Error generating fake users:', err);
        },
        complete: () => {
          this.isFetching = false;
        }
      });
    }
  }
  
  
  generateFakeUsers(count: number): AntUser[] {
    const startId = this.users.length + 1;
    return Array.from({ length: count }, (_, i) => {
      const id = (startId + i).toString();
      return {
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        avatar: `https://i.pravatar.cc/50?u=fake${id}`,
        gender: 'unknown',
      };
    });
  }

  hideToastAfterDelay(): void {
    if (this.toastTimeoutId) clearTimeout(this.toastTimeoutId);
    this.toastTimeoutId = setTimeout(() => (this.showNotification = false), 1000);
  }

  // FIXED: Typed the event as Event
  // FIXED: Type-safe casting using `instanceof`
  loadMoreOnScroll(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const nearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 10;
    const maxUsers = this.config?.maxUsers ?? this.DEFAULT_MAX_USERS;

    if (nearBottom && !this.isFetching && this.users.length < maxUsers) {
      this.fetchNextPage();
    }
  }

  onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      this.loadMore();
    }
  }

  loadMore(): void {
    if (this.loading || this.currentIndex >= this.data.length) return;
  
    this.loading = true;
    if (this.loadTimeoutId) clearTimeout(this.loadTimeoutId);
  
    const delay = this.config?.delayMs ?? 1000;
  
    this.userService.loadMoreVirtualItems(this.data, this.currentIndex, this.batchSize, delay)
      .then(nextItems => {
        this.visibleItems = [...this.visibleItems, ...nextItems];
        this.currentIndex += this.batchSize;
      })
      .catch(error => {
        console.error('Error loading more items:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  

  get gridStyle() {
    const gridConfig: GridSettings | undefined = this.settings?.grid;
    const gutter = gridConfig?.gutter || 0;

    function normalize(value: number | undefined | null): number | null {
      if (value === 0) return 1;
      return value ?? null;
    }

    return {
      display: 'grid',
      gap: `${gutter}px`,
      '--grid-cols-xs': normalize(gridConfig?.xs),
      '--grid-cols-sm': normalize(gridConfig?.sm),
      '--grid-cols-md': normalize(gridConfig?.md),
      '--grid-cols-lg': normalize(gridConfig?.lg),
      '--grid-cols-xl': normalize(gridConfig?.xl),
      '--grid-cols-xxl': normalize(gridConfig?.xxl),
      '--grid-cols-default': normalize(gridConfig?.column ?? 1),
    };
  }

  get isAvatarList(): boolean {
    return this.avatarItems && this.avatarItems.length > 0;
  }

  get isVerticalList(): boolean {
    return this.verticalItems && this.verticalItems.length > 0;
  }

  get pageSize(): number {
    return typeof this.pagination === 'object' ? this.pagination.pageSize : 3;
  }

  public get showPagination(): boolean {
    return !!this.pagination;
  }
  
  public get totalPages(): number {
    this.updatePaginationCache();
    return this._totalPages;
  }
  
  public get paginatedItems(): ListVerticalItem[] {
    this.updatePaginationCache();
    return this._paginatedItems;
  }
  
  public updatePaginationCache(): void {
    const itemsLength = this.verticalItems?.length || 0;
    const needsUpdate =
      itemsLength !== this._lastVerticalItemsLength ||
      this.currentPage !== this._lastCurrentPage ||
      this.pageSize !== this._lastPageSize;
  
    if (needsUpdate) {
      const start = (this.currentPage - 1) * this.pageSize;
      this._paginatedItems = this.verticalItems.slice(start, start + this.pageSize);
      this._totalPages = Math.ceil(itemsLength / this.pageSize);
  
      this._lastVerticalItemsLength = itemsLength;
      this._lastCurrentPage = this.currentPage;
      this._lastPageSize = this.pageSize;
    }
  }
  
  
  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginationCache();
    }
  }
  
  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginationCache();
    }
  }
  
  ngOnDestroy(): void {
    if (this.toastTimeoutId) clearTimeout(this.toastTimeoutId);
    if (this.loadTimeoutId) clearTimeout(this.loadTimeoutId);
    if (this.httpSub) this.httpSub.unsubscribe();
  }
}
