import { Link } from 'react-router-dom'
import { useLogInStore } from '../utils/store'
import Nav from '../components/Nav'
import LogInAndRegister from '../components/LogInAndRegister'
import './Home.css'

function Home() {
  const { loggedIn } = useLogInStore()
  return (
    <>
      {loggedIn ? (
        <>
          <Nav />
          <h1>Loungecrate</h1>
          <Link id="home-add-event-button" to="/addevent">
            Add event
          </Link>
        </>
      ) : (
        <LogInAndRegister />
      )}
    </>
  )
}

export default Home
