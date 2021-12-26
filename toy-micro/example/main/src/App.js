import { BrowserRouter as Router, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/abc">xxx</Link>
              </li>
              <li>
                <Link to="/efg">add</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
      <div id="micro-container" />
    </div>
  )
}

export default App
