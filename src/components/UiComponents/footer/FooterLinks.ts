export type FooterLink = { name: string; path: string;id?:string };
export const MainLinks: FooterLink[] = [
  {
    name: 'home',
    path: '/',
    id: "1",

  },
  {
    name: 'blog',
    path: '/blog',
    id: "1",
  
  },
  {
    name: 'about',
    path: '/about',
    id: "1",
  
  },
  {
    name: 'cataluge',
    path: '/cataluge',
    id: "1",
  
  },
  {
    name: 'products',
    path: '/products',
    id: "1",
  
  },
  {
    name: 'galary',
    path: '/galary',
    id: "1",
  
  },
  {
    name: 'projects',
    path: '/projects',
    id: "1",
  
  },
  {
    name: 'locations',
    path: '/our-locations',
    id: "1",
  
  },
];
export const QuickLinks: FooterLink[] = [
  {
    name: 'about',
    path: '/about',
  },
  {
    name: 'faqs',
    path: '/faqs',
  },
  {
    name: 'technical-support',
    path: '/technical-support',
    // path: "/privacy-policy",
  },
  {
    name: 'complaints',
    path: '/complaints',
  },
  {
    name: 'retun-policy',
    path: '/return-policy',
  },
];
