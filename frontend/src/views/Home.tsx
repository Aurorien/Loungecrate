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
        </>
      ) : (
        <LogInAndRegister />
      )}
    </>
  )
}

export default Home
