// src/app/config/list.config.ts
// section 1
export interface ListConfig {
    title: string;
    size: 'default' | 'small' | 'large';
    header: string;
    footer: string;
    bordered?: boolean;
    split?: boolean;
    dataSource: { text: string }[];
  }
  
  export const listConfigs: ListConfig[] = [
    {
      title: 'DEFAULT SIZE',
      size: 'default',
      header: 'Header',
      footer: 'Footer',
      bordered: true,
      split: true,
      dataSource: [
        { text: 'Racing car sprays burning fuel into crowd.' },
        { text: 'Japanese princess to wed commoner.' },
        { text: 'Australian walks 100km after outback crash.' },
        { text: 'Man charged over missing wedding girl.' },
        { text: 'Los Angeles battles huge wildfires.' },
      ],
    },
    {
      title: 'SMALL SIZE',
      size: 'small',
      header: 'Header',
      footer: 'Footer',
      bordered: true,
      split: true,
      dataSource: [
        { text: 'Racing car sprays burning fuel into crowd.' },
        { text: 'Japanese princess to wed commoner.' },
        { text: 'Australian walks 100km after outback crash.' },
        { text: 'Man charged over missing wedding girl.' },
        { text: 'Los Angeles battles huge wildfires.' },
      ],
    },
    {
      title: 'LARGE SIZE',
      size: 'large',
      header: 'Header',
      footer: 'Footer',
      bordered: true,
      split: true,
      dataSource: [
        { text: 'Racing car sprays burning fuel into crowd.' },
        { text: 'Japanese princess to wed commoner.' },
        { text: 'Australian walks 100km after outback crash.' },
        { text: 'Man charged over missing wedding girl.' },
        { text: 'Los Angeles battles huge wildfires.' },
      ],
    },
  ];
  
  