export type Movie = {
  slug: string;
  image: string;
  name: string;
  rates?: Rate[];
  category: string;
  duration: string;
  age: string;
  release_date: string;
  country: string;
  trailer: string;
  added_date: string;
};

export type Rate = {
  userSlug: string;
  rate: number;
};

export type Category = {
  slug: string;
  name: string;
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
