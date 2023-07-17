import Footer from '../Footer/Footer';
import TableBody from '../Table/TableBody'
import TopBanner from '../Table/TopBanner'

const Home = () => {
  document.title = `Home-Rangon House`;
  return (
    <div>
      <TopBanner/>
      <TableBody/>
      <Footer/>
    </div>
  )
}

export default Home;