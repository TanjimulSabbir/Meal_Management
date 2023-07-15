import UserInfo from "../../assets/JsonFiles/Names.json";
import Login from '../../components/Login/Login';

const PrivateRoute = ({ children }) => {
  const UserData = JSON.parse(localStorage.getItem("UserLoginData"));

  if (!UserData) {
    return <Login />;
  }

  const { name: UserName, room: UserRoom } = UserData;
  const UserExist = UserInfo.users.find((user) => user.name === UserName && user.room == UserRoom);

  if (UserExist) {
    return children;
  } else {
    return <Login />;
  }
};

export default PrivateRoute;
