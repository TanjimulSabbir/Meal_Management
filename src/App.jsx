import { Route, Routes,Navigate } from 'react-router-dom';
import Login from './components/Login/Login'
import Home from "../src/components/Home/Home"
import PrivateRoute from './Layout/Shared/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<PrivateRoute><Home></Home></PrivateRoute>} />
      <Route path="/meal-counter" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
