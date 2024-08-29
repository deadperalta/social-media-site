import {React, useState, useEffect} from 'react'
import './profile.css'
import PostDetail from './postdetail'
import { Params, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'; 

export default function UserProfile() {

  var picture = "https://cdn-icons-png.flaticon.com/128/552/552721.png"
    const {id}=useParams()
    //console.log(id);
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])
    const [isfollow, setIsfollow] = useState(false)

      //toast functions
      const notifyA=(msg)=>toast.error(msg)
      const notifyB=(msg)=>toast.success(msg) 

    const followUser= (id) => {
        fetch("http://localhost:5000/api/user/follow" , {
            method : "put",
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"), 
            },
            body: JSON.stringify({
                followId : id
            })
        })
        .then((res) => res.json())
        .then(data => {
            setIsfollow(true)
            console.log(data)
        })
    };

    const unfollowUser= (id) => {
        fetch("http://localhost:5000/api/user/unfollow" , {
            method : "put",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer "+localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                followId : id
            })
        })
        .then(res => res.json())
        .then(data => {
            setIsfollow(false)
            console.log(data)
        })
    };

    const toggleDetails = (post) => {
        if(show)
        {
          setShow(false)
        }
        else
        {
          setShow(true)
          setItems(post)
          //console.log(items);
        }
      }
      
  const [pic, setPic] = useState([])

  useEffect(() => {

    fetch(`http://localhost:5000/api/user/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then(res=>res.json())
    .then(result=> {
        setUser(result.user)
        if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
            setIsfollow(true)
        }
        setPosts(result.post)
        //console.log(result)
    })
    .catch(err => console.log(err))
  }, [isfollow])
  

  const makeComment = (text,id) => {
    fetch("http://localhost:5000/api/post/comment",{
      method : "PUT",
      headers : {
        "Content-Type":"application/json",
        "authorization" : "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text:text,
        postId:id
      })
    }).then(res => res.json())
    .then((result) => {

      notifyB("Comment Posted")
    })
  }

  return (
    <div className='for'>
    <div className='profile'>
        <div className='profile-frame'>
          <div className='profile-pic'>
            <img src={user.photo ? user.photo : picture}></img>
          </div>

          <div className='profile-data'>
            <div style={{display: "flex" , alignItems : "center" , justifyContent : "space-between"}}> 
            <h1>{user.name}</h1>

            
               {
                  user._id != JSON.parse(localStorage.getItem("user"))._id?(
            
                    <button className='followBtn' onClick={() => {
                      if (isfollow) {
                          unfollowUser(user._id)
                      }
                      else
                      {
                          followUser(user._id)
                      }
                  }}>
                      {isfollow? "Unfollow" : "Follow"}
                  </button>
              )
              : 
              (
                <></>
             )

          }

            </div>
            <div className='profile-info' style={{display:"flex"}}>
              <p>{posts.length} Posts</p>
              <p>{user.followers? user.followers.length : "0"} Followers</p>
              <p>{user.following? user.following.length : "0"} Following</p>
            </div>
          </div>
          </div>

            <hr
            style={{
              width: "90%",

              opacity: "0.8",
              margin: "25px auto",
            }}
          />

            <div className='gallery'>
              {
                (posts.map((pics) => {
                  return <img key={pics._id} src={pics.body} className='item' onClick={() => {
                    toggleDetails(pics);
                    setShow(true);
                  }}></img>
                }))
              }
            </div>
            {show && 
             <PostDetail item={items} user={user} toggleDetails={toggleDetails}/>
}
          </div>
       
          </div>
  )
}
