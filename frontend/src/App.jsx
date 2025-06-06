import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'

import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Dashboard from './pages/Dashboard'
import NewMember from './components/team/NewMember'
import ChatBotWindow from './components/chatBot/ChatBotWindow'

function App() {
  return (
    <>
     <BrowserRouter>
     {/* <Header/> */}
     <ToastContainer />
      <Routes>
        <Route path='/' element= {<Home/>} ></Route>
        <Route path='/signup' element= {<Signup/>} ></Route>
        <Route path='/login' element= {<Login/>} ></Route>
        <Route path='/add-member' element= {<NewMember/>} ></Route>
        <Route path='/dashboard/*' element= {<Dashboard/>} ></Route>
        <Route path='*' element= {<Dashboard/>} ></Route>

        <Route path='/chat' element= {<ChatBotWindow/>} ></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
