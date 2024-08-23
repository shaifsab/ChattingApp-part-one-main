import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import database from './firebase.config'
import LoginPage from './Pages/LoginPage'
import ForgetPage from './Pages/ForgetPage'
import ErrorPage from './Pages/ErrorPage'
import RegisterPage from './Pages/RegisterPage'

database

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      
      <Route>
        {/* <Route path='/login' element={<LoginPage/>}/> home page asle aita use korbo */}
        <Route index element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/forget' element={<ForgetPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Route>
    )
  )

  return (
    <>
     <RouterProvider router={route} />
    </>
  )
}

export default App
