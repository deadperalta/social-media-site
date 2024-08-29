import {React, useState, useEffect} from 'react'
import './profile.css'
import PostDetail from './postdetail'
import ProfilePic from './profilepic'


export default function Profile() {

    var picture = "https://cdn-icons-png.flaticon.com/128/552/552721.png"
    const [show, setShow] = useState(false)
    const [posts, setPosts] = useState([])
    const [changePic, setChangePic] = useState(false)
    const [comment, setComment] = useState("")


    const toggleDetails = (post) => {
        if(show)
        {
          setShow(false)
        }
        else
        {
          setShow(true)
          setPosts(post)
        }
      }

    const changeprofile = () => {
      if(changePic)
      {
        setChangePic(false)
      }
      else
      {
        setChangePic(true)
      }
    }
      
  const [pic, setPic] = useState([])
  const [user, setUser] = useState("")

  useEffect(() => {

    fetch(`http://localhost:5000/api/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers : {
        Authorization : "Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=> {
      setPic(result.post)
      setUser(result.user)
      //console.log(result);
    })
    .catch(err => console.log(err))
  }, [])
  
  return (
    <div className='for'>
    <div className='profile'>
        <div className='profile-frame'>
          <div className='profile-pic'>
            <img onClick={changeprofile} src={user.photo ? user.photo : picture}/>
          </div>

          <div className='profile-data'>
            <h1>{JSON.parse(localStorage.getItem("user")).username}</h1>

            <div className='profile-info' style={{display:"flex"}}>
              <p>{pic ? pic.length : "0"} Posts</p>
              <p>{user.followers ? user.followers.length : "0"} Followers</p>
              <p>{user.following ? user.following.length : "0"} Following</p>
            </div>
            </div>
        </div>
             <hr
            style={{
              width: "100%",

              opacity: "0.8",
              margin: "25px auto",
            }}
          />
          
           

            <div className='gallery'>
              {
                (pic.map((pics) => {
                  return <img key={pics._id} src={pics.body} className='item' onClick={() => {toggleDetails(pics)}}></img>
                }))
              }
            </div>
            {show && 
             <PostDetail item={posts} user={user} toggleDetails={toggleDetails}/>
            }

            {
              changePic && <ProfilePic changeprofile={changeprofile}/>
            }


      
    </div>
    </div>
  )
}
