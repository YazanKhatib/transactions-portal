// PrivateRoute.ts
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';
import RoutePaths from '../RoutePath';

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  return isAuthenticated() ? element : <Navigate to={RoutePaths.Login} />;
};

export default PrivateRoute;
