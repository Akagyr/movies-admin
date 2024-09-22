export type Movie = {
  slug: string;
  image: string;
  name: string;
  rates?: Rate[];
  category: string;
  duration: string;
  age: string;
  release_date: number;
  country: string;
  trailer: string;
  added_date: string;
  comments: Comment[];
};

export type Rate = {
  userSlug: string;
  rate: number;
};

export type Category = {
  slug: string;
  name: string;
};

export type Comment = {
  slug: string;
  userSlug: string;
  userName: string;
  userPhoto: string;
  text: string;
  date_adding: number;
};

export type User = {
  slug: string;
  name: string;
  email: string;
  photo?: string;
  role: 'user' | 'admin';
  favourites?: Favourite[];
  seeLater?: SeeLater[];
};

export type Favourite = {
  slug: string;
};

export type SeeLater = {
  slug: string;
};
