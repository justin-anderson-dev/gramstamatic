import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './utils/constants/routes';
import UserContext from './context/user';
import useAuthListener from './utils/hooks/use-auth-listener';

import ProtectedRoute from './utils/helpers/protected-route';

const Login = lazy(() => import('./views/login'));
const SignUp = lazy(() => import('./views/sign-up'));
const Dashboard = lazy(() => import('./views/dashboard'));
const Profile = lazy(() => import('./views/profile'));
const NotFound = lazy(() => import('./views/not-found'));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
          <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard user={user}/>
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
