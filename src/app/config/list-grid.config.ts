// src/app/config/list-grid.config.ts

export interface GridSettings {
  gutter: number;
  column: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface ListItem {
  title: string;
  content: string;
}

export interface CustomListSettings {
  title: string; //Add title here
  grid: GridSettings;
  items: ListItem[];
}

export const CUSTOM_LIST_SETTINGS_1: CustomListSettings = {
  title: 'GRID', //Add title
  grid: {
    gutter: 16,
    column: 2,
  },
  items: [
    { title: 'Title 1', content: 'Card content 1' },
    { title: 'Title 2', content: 'Card content 2' },
    { title: 'Title 3', content: 'Card content 3' },
    { title: 'Title 4', content: 'Card content 4' },
  ],
};

export const CUSTOM_LIST_SETTINGS_2: CustomListSettings = {
  title: 'RESPONSIVE GRID', // Add title
  grid: {
    gutter: 16,
    column: 0,
    xs: 3,
    sm: 3,
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3,
  },
  items: [
    { title: 'Title 1', content: 'Card content 1' },
    { title: 'Title 2', content: 'Card content 2' },
    { title: 'Title 3', content: 'Card content 3' },
    { title: 'Title 4', content: 'Card content 4' },
    { title: 'Title 5', content: 'Card content 5' },
    { title: 'Title 6', content: 'Card content 6' },
  ],
};
