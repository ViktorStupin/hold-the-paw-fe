export const RoutePath = {
  Default: '/',
  Home: '/home',
  Pets: '/pets',
  Pet: '/pets/:id',
  CreatePetProfile: '/create-pet-profile',
  EditPetProfile: '/edit-pet-profile',
  Favorites: '/favorites',
  Profile: '/profile',
  NotFound: '*',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
