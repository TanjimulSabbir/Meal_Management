import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import Home from "../src/components/Home/Home"
import PrivateRoute from './Layout/Shared/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/meal-counter' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
      <Route path='/' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
    </Routes>
  );
};

export default App;
