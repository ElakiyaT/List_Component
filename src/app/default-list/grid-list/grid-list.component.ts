import { Component, Input } from '@angular/core';
import { ListItem } from '../../config/list-grid.config';

@Component({
  selector: 'app-grid-list',
  imports: [],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css'
})
export class GridListComponent {
  @Input() entry!: ListItem;
}
