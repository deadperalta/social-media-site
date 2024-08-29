import {React, useEffect, useState} from 'react'
import safebook from "../img/safebook.png"
import './signup.css'
import { Link , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'; 

export default function Signup() {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    //toast functions
    const notifyA=(msg)=>toast.error(msg)
    const notifyB=(msg)=>toast.success(msg) 
    
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const postData=()=>{

        //checking email
        if(!emailregex.test(email))
        {
            console.log("false");
            notifyA("Enter Valid Email Address")
            return
        }
         // check password strength
        
        else if(!passRegex.test(password))
        {
            notifyA("Password must contain atleat 8 characters including at least 1 number, 1 lowercase alphabet, 1 uppercase alphabet and 1 special character")
            return;
        }
        //sending data

        fetch("http://localhost:5000/api/user/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({
                name:name,
                username:username,
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
                notifyB(data.message);
                navigate("/login")
            }
            console.log(data)});
    }
  return (
    <div className='signUp'>
        <div className='form-container'>
            <div className='form'>
                
                <img src={safebook} alt='' className='signUpLogo'></img>
                
                <div>
                <p className='loginPara'>
                    Sign up to see photos and videos <br/> from your friends
                </p>

                <div>
                    <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
                
                <div>
                    <input type='text' name='name' id='name' placeholder='Full Name' value={name} onChange={(e) => {setName(e.target.value)}}></input>
                </div>
                
                <div>
                    <input type='text' name='username' id='username' placeholder='Username' value={username} onChange={(e) => {setusername(e.target.value)}}></input>
                </div>

                <div>
                    <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e) => {setpassword(e.target.value)}}></input>
                </div>

                <p className='loginPara' style={{fontSize:"12px" , margin:"3px 0px"}}>
                    By signing up, you agree to our Terms <br/> privacy policy and cookie police
                </p>

                <input type="submit" id='submit-btn' value={"Sign Up"} onClick={() => {postData()}}></input>
                </div>
            </div>
            <div className="form2">
                Already have an account ?
                <Link to="/login">
                    <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
                </Link>
        </div>
        </div>
    </div>
  )
}
