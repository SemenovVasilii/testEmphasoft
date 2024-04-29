import { useEffect } from 'react'
import './App.scss'
import { Authorization, Registration, Home } from './pages'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { store, RootState } from './store'
import { useSelector } from 'react-redux'
import { SetAuth } from './store/userReducer'

function App() {

  const isAuth = useSelector((state: RootState) => state.user.isAuth)

  useEffect(() => {
    const token: string | null = localStorage.getItem('token')
    if (token !== null) {
      store.dispatch(SetAuth())
    }
  }, [])

  return (
    <div className='app'>
      <HashRouter>
        {!isAuth ?
          <Routes>
            <Route path="/" element={<Authorization />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        }
      </HashRouter>
    </div>
  )
}

export default App
