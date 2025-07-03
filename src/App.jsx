import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Setbutton from './Googlebutton';
import logo from './assets/KDsearch_logo.svg';
import './Googlebutton.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {/*変更点*/}
      <div className="Google-Login">
        <img src={logo} className="KDS-logo" alt="logo" />
        <p>
          googleアカウントでログインする
        </p>
        <Setbutton className="Googlebutton"/>
        </div>
    </>
  )
}

export default App
