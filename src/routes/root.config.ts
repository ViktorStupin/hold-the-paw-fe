export const RoutePath = {
  Default: '/',
  Auth: '/auth',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  Home: '/home',
  Pets: '/pets',
  Pet: '/pets/:id',
  CreatePetProfile: '/create-pet-profile',
  EditPetProfile: '/edit-pet-profile/:id',
  Favorites: '/favorites',
  Profile: '/profile',
  TermsAndContitions: '/term-and-contitions',
  NotFound: '*',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export const PROTECTED_ROUTES_CONFIG: Record<string, string> = {
  [RoutePath.CreatePetProfile]: 'Для створення профіля тваринки потрібно  бути авторизованим',
  [RoutePath.EditPetProfile]: 'Для редагування профіля тваринки потрібно  бути авторизованим',
  [RoutePath.Profile]: 'Для перегляду профілю потрібно бути авторизованим',
};
