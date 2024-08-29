import logo from './logo.svg';
import {React ,createContext, useState} from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import CreatePost from './components/createpost';
import { ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context/logincontext';
import Modal from './components/modal';
import Profile from './components/profile';
import UserProfile from './components/userprofile';
import MyFollowingPost from './components/myfollowingpost';

function App() {

    const [userLogin, setUserLogin] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDele, setModalDele] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">

      <LoginContext.Provider value={{setUserLogin,setModalOpen,setModalDele}}>
        <Navbar login={userLogin}/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/createpost" element={<CreatePost/>}></Route>
            <Route exact path='/profile' element={<Profile/>}></Route>
            <Route path="/profile/:id" element={<UserProfile/>}></Route>
            <Route path='/followingpost' element={<MyFollowingPost/>}></Route>
          </Routes>

          <ToastContainer theme='dark'/>
          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>

          
      </div>
    </BrowserRouter>
  );
}

export default App;
