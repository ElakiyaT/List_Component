// Virtual list
export interface AntUser {
    id: string;
    email: string;
    gender: string;
    name: string;
    avatar: string;
  }
  
  export const VIRTUAL_LIST_CONFIG = {
    title: 'VIRTUAL LIST',
    apiUrl: 'https://jsonplaceholder.typicode.com/users',
    pageSize: 20,
    containerHeight: 400,
    link: 'https://ant.design',
    maxUsers: 100,
    delayMs: 500,
  };
  export interface VirtualListConfig {
    title: string;
    apiUrl: string;
    pageSize: number;
    containerHeight?: number;
    link?: string;
    maxUsers?: number; 
    delayMs?: number; 
   }
