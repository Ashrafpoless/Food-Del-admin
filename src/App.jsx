// react router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// components
import Layout from './components/Layout/Layout'
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Add from './pages/Add/Add';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
//import Home from './pages/Home/Home.JSX';

function App() {
  
  
  const Router = createBrowserRouter([
    { path:'/', element:<Layout/>, errorElement: <ErrorPage/>, children:[
       // {index:true , element :<Home/>},
        {path:'/add', element: <Add/> },
        {path:'/list', element: <List/>},
        {path:'/orders', element: <Orders/>}

    ]}
])

  return (
    <>
      <div >
        <RouterProvider router={Router}/>
      </div>
    </>
  )
}

export default App
