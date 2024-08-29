import {React, useEffect,useContext} from 'react'
import safebook from '../img/safebook.png'
import './navbar.css'
import { Link , useNavigate} from 'react-router-dom'
import { LoginContext } from '../context/logincontext'

export default function Navbar({login}) {

  const navigate = useNavigate()
  const {setModalOpen}=useContext(LoginContext)
  const loginStatus=()=>{
    const token = localStorage.getItem("jwt");

    if(login || token)
    {
      return [
        <>
        <Link to="/createPost">
            <span class="material-symbols-outlined">add_circle</span>
            </Link>
        <Link to="/profile">
          <li> Profile </li></Link> 

        <Link to="/followingpost">My Following</Link>
        <Link to={""}>
          <button className='primaryBtn' onClick={() => {setModalOpen(true)}}>Log out</button>
        </Link>
        </>
      ]
    }
    else
    {
      return [
        <>
         <Link to="/login">
              <li>Login</li>
          </Link>

          <Link to="/signup">
              <li>Signup</li>
          </Link>
        </>
      ]
    }
  }
  return (
    <div className='navbar'>
        <img src={safebook} alt='' onClick={() => {navigate("/")}}></img>

        <ul className='nav-menu'>
           
        {loginStatus()}
            
        </ul>
    </div>
  )
}
