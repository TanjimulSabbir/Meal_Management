import { Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import TableBody from '../Table/TableBody'
import TopBanner from '../Table/TopBanner'

const Home = () => {
  document.title = `Home-Rangon House`;
  const UserData = JSON.parse(localStorage.getItem("UserLoginData"));
  if (!UserData) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div>
      <TopBanner />
      <TableBody />
      <Footer />
    </div>
  )
}

export default Home;