import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import App from '@/App';
import { RoutePath } from './root.config';
import { SignUpForm } from '@/components/Auth/SignUpForm/SignUpForm';
import { AuthPage } from '@/pages/AuthPage/AuthPage';
import { SignInForm } from '@/components/Auth/SignInForm/SignInForm';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthRequiredModal } from '@/components/Auth/AuthRequiredModal/AuthRequiredModal';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { CreatePetProfile } from '@/pages/CreatePetProfile/CreatePetProfile';
import { EditPetProfile } from '@/pages/EditPetProfile/EditPetProfile';
import { FindPage } from '@/pages/FindPage/FindPage';
import { MyPetPage } from '@/pages/MyPetPage/MyPetPage';
import { Profile } from '@/pages/ProfilePage/Profile';
import { useAuthModalStore } from '@/store/authModal.store';

export const Root = () => {
  const { isOpen, message, close } = useAuthModalStore();


  return (
    <HashRouter>
      <Routes>
        <Route path={RoutePath.Default} element={<App />}>
          <Route index element={<div />} />
          <Route path={RoutePath.Home} element={<Navigate to={RoutePath.Default} replace />} />

          <Route path={RoutePath.Pets} element={<FindPage />} />
          <Route path={RoutePath.Pet} element={<div>Pet Detail Page</div>} />

          <Route element={<PublicOnlyRoute />}>
            <Route path={RoutePath.Auth} element={<AuthPage />}>
              <Route index element={<Navigate to={RoutePath.SignIn} replace />} />
              <Route path={RoutePath.SignUp} element={<SignUpForm />} />
              <Route path={RoutePath.SignIn} element={<SignInForm />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path={RoutePath.CreatePetProfile} element={<CreatePetProfile />} />
            <Route path={RoutePath.EditPetProfile} element={<EditPetProfile/>} />
            <Route path={RoutePath.MyPets} element={<MyPetPage />} />

            <Route path={RoutePath.Profile} element={<Profile variant='view' />} />
            <Route path={RoutePath.EditProfile} element={<Profile variant='edit' />} />
          </Route>

          <Route path={RoutePath.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>

      <AuthRequiredModal
        message={message}
        isOpen={isOpen}
        onClose={close}
      />
    </HashRouter>
  );
};
