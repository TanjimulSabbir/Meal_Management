import { useNavigate,Navigate } from "react-router-dom";
import UserInfo from "../../assets/JsonFiles/Names.json";
import Login from '../../components/Login/Login';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const UserData = JSON.parse(localStorage.getItem("UserLoginData"));
  // const admin = (UserData.name === "Tanjim25");
  document.title = `Login-Rangon House`;
  if (!UserData) {
    return <Navigate to="/login" replace={true} />;
  }
  const { name: UserName, room: UserRoom } = UserData;
  const UserExist = UserInfo.users.find((user) => user.name === UserName && user.room == UserRoom);

  const admin = (UserName === "Tanjim25" && UserData.room == UserRoom);

  if (UserExist || admin) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivateRoute;
