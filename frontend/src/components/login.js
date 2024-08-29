import {React, useContext, useState} from 'react'
import './login.css'
import safebook from '../img/safebook.png'
import { Link , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'; 
import { LoginContext } from '../context/logincontext';

export default function Login() {
    const {setUserLogin}=useContext(LoginContext)

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //toast functions
    const notifyA=(msg)=>toast.error(msg)
    const notifyB=(msg)=>toast.success(msg) 
    
    //regexes
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData=()=>{

        //checking email
        if(!emailregex.test(email))
        {
            console.log("false");
            notifyA("Enter Valid Email Address")
            return
        }


        //sending data
        fetch("http://localhost:5000/api/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data => {

            if(data.error)
            {
                notifyA(data.error);
            }
            else
            {
                notifyB("Signed in Sucessfully");
                console.log(data.token);
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user))
                setUserLogin(true);
                navigate("/")
            }
            console.log(data)});
    }

  return (
    <div className='signIn'>
        <div className='loginForm'>
            <img src={safebook} alt='' className='loginLogo'></img>
            <div>
                <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            <div>
                <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>

            <input type='submit' id='login-btn' value={"Login"} onClick={() => {postData()}}></input>
        </div>

        <div className='loginForm2'>
            Don't Have an Accout?
            <Link to="/signup">
                <span> Signup</span>
            </Link>
            
        </div>
    </div>
  )
}
