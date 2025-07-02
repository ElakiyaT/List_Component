// src/app/config/list.config.ts

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
      title: 'Default Size',
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
      title: 'Small Size',
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
      title: 'Large Size',
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
  
  export interface AvatarListItem {
    avatar: string;
    title: string;
    description: string;
  }
  
  export const avatarListConfig: AvatarListItem[] = [
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      title: 'Ant Design Title 1',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      title: 'Ant Design Title 2',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      title: 'Ant Design Title 3',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
      title: 'Ant Design Title 4',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
  ];
  

  export interface ListItem {
    avatar?: string;      // optional avatar image url, not used here
    title: string;        // the title text
    url?: string;         // optional URL for the title link
    description: string;  // description text
    actions?: string[];   // array of action labels (not links)
  }
  
  export const listItems: ListItem[] = [
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=letgoboizz',
      title: 'Let go boizz',
      url: 'https://example.com/letgoboizz',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      actions: ['content', 'edit more'],
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=israelfriesen',
      title: 'Israel Friesen',
      url: 'https://example.com/israelfriesen',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      actions: ['content', 'edit more'],
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=terencehilpert',
      title: 'Terence Hilpert II',
      url: 'https://example.com/terencehilpert',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      actions: ['content', 'edit more'],
    },
  ];
  
// list-vertical.config.ts (new config file to be added alongside existing config)
export interface ListVerticalItem {
    href: string;
    title: string;
    avatar: string;
    description: string;
    content: string;
    imageUrl?: string;
    actions: { icon: string; label: string }[];
  }
  
  export const listVerticalConfig: ListVerticalItem[] = Array.from({ length: 23 }).map((_, index) => ({
    href: 'https://ant.design',
    title: `ant design part ${index}`,  // Start from 0
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    actions: [
      { icon: 'star', label: '156' },
      { icon: 'like', label: '156' },
      { icon: 'message', label: '2' },
    ],
  }));
  