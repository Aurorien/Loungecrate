import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import BandView from './views/BandView'
import AddEvent from './views/AddEvent'

// import Nav from './components/Nav'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/band" element={<BandView />} />
          <Route path="/addevent" element={<AddEvent />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
