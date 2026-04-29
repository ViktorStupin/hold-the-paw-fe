export const RoutePath = {
  Default: '/',
  Auth: '/auth',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  Home: '/home',
  Pets: '/pets',
  MyPets: '/my-pets',
  Pet: '/pets/:id',
  CreatePetProfile: '/create-pet-profile',
  EditPetProfile: '/edit-pet-profile/:id',
  Profile: '/profile',
  EditProfile: '/profile/edit',
  TermsAndContitions: '/term-and-contitions',
  NotFound: '*',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export const PROTECTED_ROUTES_CONFIG: Record<string, string> = {
  [RoutePath.CreatePetProfile]: 'Для створення профіля тваринки потрібно  бути авторизованим',
  [RoutePath.EditPetProfile]: 'Для редагування профіля тваринки потрібно  бути авторизованим',
  [RoutePath.MyPets]: 'Для перегляду ваших тваринок потрібно бути авторизованим',
  [RoutePath.Profile]: 'Для перегляду профілю потрібно бути авторизованим',
  [RoutePath.EditProfile]: 'Для редагування профілю потрібно бути авторизованим',
};



export const getPath = {
  editPetProfile: (id: number | string) => `/edit-pet-profile/${id}`,
  pet: (id: number | string) => `/pets/${id}`,
};
