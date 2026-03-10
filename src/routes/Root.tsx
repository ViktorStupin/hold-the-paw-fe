import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import App from '@/App';
import { RoutePath } from './root.config';
import { HomePage } from '@/pages/HomePage';
import { CreatePetProfile } from '@/pages/CreatePetProfile/CreatePetProfile';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        //TODO: protected routes
        <Route path={RoutePath.Default} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={RoutePath.Home} element={<Navigate to={RoutePath.Default} replace />} />
          <Route path={RoutePath.Pets} element={<div>Pets Page</div>} />
          <Route path={RoutePath.Pet} element={<div>Pet Detail Page</div>} />
          <Route path={RoutePath.CreatePetProfile} element={<CreatePetProfile />} />
          <Route path={RoutePath.EditPetProfile} element={<div>Edit Profile Page</div>} />
          <Route path={RoutePath.Favorites} element={<div>Favorites Page</div>} />
          <Route path={RoutePath.Profile} element={<div>Profile Page</div>} />
          <Route path={RoutePath.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
