import { Link } from 'react-router-dom'

function Nav() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/band">Band View</Link>
      </nav>
    </>
  )
}

export default Nav
