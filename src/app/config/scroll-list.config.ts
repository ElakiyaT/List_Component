export interface UserEntry {
  name: string;
  email: string;
  avatar: string;
  contents: string;
  link: string;
}

// Wrap data inside an object with a title
export const scrollListConfig: { title: string; items: UserEntry[]; endMessage: string;} = {
  title: 'SCROLL LIST',
  endMessage: 'It is all, nothing more 🤐', 
  items: Array.from({ length: 40 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${i + 1}`,
    contents: 'Content',
    link: 'https://ant.design',
  })),
};
