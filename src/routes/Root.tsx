import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import App from '@/App';
import { RoutePath } from './root.config';
import { HomePage } from '@/pages/HomePage';
import { CreatePetProfile } from '@/pages/CreatePetProfile/CreatePetProfile';
import { SignUpForm } from '@/components/Auth/SignUpForm/SignUpForm';
import { AuthPage } from '@/pages/AuthPage/AuthPage';
import { SignInForm } from '@/components/Auth/SignInForm/SignInForm';
import { useState } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthRequiredModal } from '@/components/Auth/AuthRequiredModal/AuthRequiredModal';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { EditPetProfile } from '@/pages/EditPetProfile/EditPetProfile';
import { MyPetPage } from '@/pages/MyPetPage/MyPetPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { EditProfile } from '@/pages/ProfilePage/EditProfile';

export const Root = () => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });

  const handleAuthRequired = (message: string) => {
    setAuthModal({ isOpen: true, message });
  };

  return (
    <HashRouter>
      <Routes>
        <Route path={RoutePath.Default} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={RoutePath.Home} element={<Navigate to={RoutePath.Default} replace />} />

          <Route path={RoutePath.Pets} element={<div>Pets Page</div>} />
          <Route path={RoutePath.Pet} element={<div>Pet Detail Page</div>} />

          <Route element={<PublicOnlyRoute />}>
            <Route path={RoutePath.Auth} element={<AuthPage />}>
              <Route index element={<Navigate to={RoutePath.SignIn} replace />} />
              <Route path={RoutePath.SignUp} element={<SignUpForm />} />
              <Route path={RoutePath.SignIn} element={<SignInForm />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute onAuthRequired={handleAuthRequired} />}>
            <Route path={RoutePath.CreatePetProfile} element={<CreatePetProfile />} />
            <Route path={RoutePath.EditPetProfile} element={<EditPetProfile />} />
            <Route path={RoutePath.MyPets} element={<MyPetPage />} />
            <Route path={RoutePath.Profile} element={<ProfilePage />} />
            <Route path={RoutePath.EditProfile} element={<EditProfile />} />
          </Route>

          <Route path={RoutePath.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>

      <AuthRequiredModal
        message={authModal.message}
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, message: '' })}
      />
    </HashRouter>
  );
};
