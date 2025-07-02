// src/app/config/list-vertical.config.ts

export interface ListVerticalItem {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
  imageUrl?: string;
  actions: { icon: string; label: string }[];
}

export interface VerticalListConfig {
  title: string;
  items: ListVerticalItem[];
}

// Wrap the array inside an object
export const listVerticalConfig: VerticalListConfig = {
  title: 'VERTICAL LIST WITH PAGINATION',
  items: Array.from({ length: 23 }).map((_, index) => ({
    href: 'https://ant.design',
    title: `ant design part ${index}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    imageUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    actions: [
      { icon: '★', label: '156' },
      { icon: '👍', label: '156' },
      { icon: '💬', label: '2' },
    ],
  })),
};
