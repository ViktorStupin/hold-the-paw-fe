export const RoutePath = {
  Default: '/',
  Auth: '/auth',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  Home: '/home',
  Pets: '/pets',
  Pet: '/pets/:id',
  CreatePetProfile: '/create-pet-profile',
  EditPetProfile: '/edit-pet-profile',
  Favorites: '/favorites',
  Profile: '/profile',
  TermsAndContitions: '/term-and-contitions',
  NotFound: '*',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
