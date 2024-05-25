import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RoutePaths from './RoutePath';
import Login from './pages/auth/login';
import Home from './pages/home';
import PrivateRoute from './utils/privateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.Home} element={<PrivateRoute element={<Home />} />} />
        <Route path={RoutePaths.Login} element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
