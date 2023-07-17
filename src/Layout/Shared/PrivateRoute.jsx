import UserInfo from "../../assets/JsonFiles/Names.json";
import Login from '../../components/Login/Login';

const PrivateRoute = ({ children }) => {
  const UserData = JSON.parse(localStorage.getItem("UserLoginData"));
  // const admin = (UserData.name === "Tanjim25");
  document.title = `Login-Rangon House`;
  if (!UserData) {
    return <Login />;
  }

  const { name: UserName, room: UserRoom } = UserData;
  const UserExist = UserInfo.users.find((user) => user.name === UserName && user.room == UserRoom);
  
  const admin =  ( UserName === "Tanjim25" && UserData.room == UserRoom);

  if (UserExist || admin) {
    return children;
  } else {
    return <Login />;
  }
};

export default PrivateRoute;
