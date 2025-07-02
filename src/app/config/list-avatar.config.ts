export interface AvatarListItem {
    avatar: string;
    title: string;
    description: string;
    link: string;
  }
  
  export interface AvatarListConfig {
    title: string;
    items: AvatarListItem[];
  }

// Correctly typed object with shape { title: string; items: AvatarListItem[] }
export const avatarListConfig: AvatarListConfig = {
  title: 'AVATAR LIST',
  items: [
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      title: 'Ant Design Title 1',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      link: 'https://ant.design',
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      title: 'Ant Design Title 2',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      link: 'https://ant.design',
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      title: 'Ant Design Title 3',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      link: 'https://ant.design',
    },
    {
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
      title: 'Ant Design Title 4',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      link: 'https://ant.design'
    }
  ]
};

  