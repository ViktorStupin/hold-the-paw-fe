export const RoutePath = {
  Default: '/',
  Home: '/home',
  Pets: '/pets',
  Pet: '/pets/:id',
  CreateProfile: '/create-profile',
  EditProfile: '/edit-profile',
  Favorites: '/favorites',
  Profile: '/profile',
  NotFound: '*',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
