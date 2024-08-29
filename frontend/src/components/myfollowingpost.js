import {React, useState, useEffect} from 'react'
import './home.css'
import { Link, useNavigate } from 'react-router-dom';
import { set } from 'mongoose';
import { toast } from 'react-toastify'; 

export default function MyFollowingPost() {
    var picture = "https://cdn-icons-png.flaticon.com/128/552/552721.png"
    const [data, setData] = useState([])
    const [comment, setComment] = useState("")
    const [show, setShow] = useState(false)
    const [item, setItem] = useState([])
  
    const navigate = useNavigate();
  
    //toast functions
    const notifyA=(msg)=>toast.error(msg)
    const notifyB=(msg)=>toast.success(msg) 
  
  
    useEffect(() => {
      
        const token = localStorage.getItem("jwt")

        if(!token)
        {
            navigate('/login')
        }

        fetch("http://localhost:5000/api/post/followingPost",{
            headers : {
                "authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setData(result)
            //console.log(result)
        })
        .catch(err => console.log(err))
    }, [])
    
    
  
    const toggleComments = (post) => {
      if(show)
      {
        setShow(false)
      }
      else
      {
        setShow(true)
        setItem(post)
      }
    }
  
    const likePost=(id) => {
      fetch("http://localhost:5000/api/post/like",{
        method : "PUT",
        headers : {
          "Content-Type":"application/json",
          "authorization" : "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res => res.json())
      .then((result) => {
  
        const newData = data.map((post) => {
          if(post._id == result._id)
          {
            return result
          }
          else
          {
            return post
          }
        })
        setData(newData)
        console.log(result)
      })
    }
  
    const unlikePost=(id) => {
      fetch("http://localhost:5000/api/post/unlike",{
        method : "PUT",
        headers : {
          "Content-Type":"application/json",
          "authorization" : "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if(post._id == result._id)
          {
            return result
          }
          else
          {
            return post
          }
        })
        setData(newData)
        console.log(result)
      })
    }
  
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
        const newData = data.map((post) => {
          if(post._id == result._id)
          {
            return result
          }
          else
          {
            return post
          }
        })
        setData(newData)
        setComment('');
        notifyB("Comment Posted")
      })
    }
  
    const removelike=(id) => {
      fetch("http://localhost:5000/api/post/removelike",{
        method : "PUT",
        headers : {
          "Content-Type":"application/json",
          "authorization" : "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res => res.json())
      .then((result) => {
  
        const newData = data.map((post) => {
          if(post._id == result._id)
          {
            return result
          }
          else
          {
            return post
          }
        })
        setData(newData)
        console.log(result)
      })
    }
  
    const removedislike=(id) => {
      fetch("http://localhost:5000/api/post/removedislike",{
        method : "PUT",
        headers : {
          "Content-Type":"application/json",
          "authorization" : "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res => res.json())
      .then((result) => {
  
        const newData = data.map((post) => {
          if(post._id == result._id)
          {
            return result
          }
          else
          {
            return post
          }
        })
        setData(newData)
        console.log(result)
      })
    }

    return (
      <div className='home'>
  
          {
            data.map((item) => {
              return (
                <div className='card'>
          <div className='card-header'>
            <div className='card-pic'>
              <img src={item.user.photo? item.user.photo : picture}>
  
              </img>
            </div>
            <h5>
              <Link to={`/profile/${item.user._id}`}>
              {item.user.username}
              </Link>
              </h5>
          </div>
  
          <div className='card-image'>
            <img src={item.body}></img>
          </div>
  
          <div className='card-content'>
  
            <div className='reaction' style={{display: "flex" , alignItems: "baseline", justifyContent : "space-around"}}>
  
            {
             item.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?(
            
              <>
              <span class="material-symbols-outlined material-symbols-outlined-black" style={{paddingTop : "15px"}} onClick={() => {
                removelike(item._id)
              }}>
                thumb_up
              </span>
              
              <p id='reaction' className='likes'>{item.likes.length - item.dislikes.length} Likes</p>

             <span id='reaction' 
                className="material-symbols-outlined" onClick={() => {unlikePost(item._id)}} style={{padding : "10px"}}>
                  thumb_down
             </span>
             </>
              )
              : 
              (
                item.dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)?(
                  <>             
                  <span id='reaction' className="material-symbols-outlined" onClick={() => {likePost(item._id)}}> 
                     thumb_up
                     </span>
 
                     <p id='reaction' className='likes'>{item.likes.length - item.dislikes.length} Likes</p>
                     
                     <span class="material-symbols-outlined material-symbols-outlined-black" style={{padding: "10px"}} onClick={() => {
                      removedislike(item._id)
                     }}>
                       thumb_down
                       </span>
               </>
                ):
                <>             
                 <span id='reaction' className="material-symbols-outlined" onClick={() => {likePost(item._id)}}> 
                    thumb_up
                    </span>

                    <p id='reaction' className='likes'>{item.likes.length - item.dislikes.length} Likes</p>
                    
                    <span class="material-symbols-outlined" style={{padding: "10px"}} onClick={() => {unlikePost(item._id)}}>
                      thumb_down
                      </span>
              </>
                
             )

          }
              </div>
  
              <p>{item.title}</p>
              <p style={{cursor: "pointer"}} onClick={() => {toggleComments(item)}}>View All Comments</p> 
          </div>
  
          <div className='add-comment'>
            <span className="material-symbols-outlined">mood</span>
            <input type='text' placeholder='Add a comment' onChange={(e) => {setComment(e.target.value)}}></input>
            <button className='comment' onClick={() => {
              makeComment(comment,item._id);
              }}>Post</button>
          </div>
  
        </div>
              )
            })
          }
  
        {
          show && (
        <div className='showComments'>
          <div className='container'>
  
            <div className='postPic'>
              <img src={item.body}></img>
            </div>
  
            <div className='details'>
            <div className='card-header'>
            <div className='card-pic'>
              <img src={item.user.photo? item.user.photo : picture}>
  
              </img>
            </div>
            <h5>{item.user.username}</h5>
          </div>
  
              <div className='comment-section' style={{borderBottom : "1px solid #00000029"}}>
  
                {
                  item.comments.map((comment) => {
                    return (<p className='comm'>
                    <span className='commenter' style={{fontWeight : "bolder"}}>{comment.user.name} </span>
                    <span className='commentText'>{comment.comment}</span>
                  </p>)
                  })
                }
  
              </div>
              <div className='card-content'>
  
            
              <p>{item.likes.length} Likes</p>
              <p>{item.title}</p>
  
          </div>
  
          <div className='add-comment'>
            <span className="material-symbols-outlined">mood</span>
            <input type='text' placeholder='Add a comment' onChange={(e) => {setComment(e.target.value)}}></input>
            <button className='comment' onClick={() => {
              makeComment(comment,item._id);
              toggleComments();
              }}>Post</button>
          </div>
  
            </div>
          </div>
  
          <div className='close-comment'>
            <span class="material-symbols-outlined material-symbols-outlined-comment" onClick={() => {toggleComments()}} >
            close
            </span>
          </div>
        </div>
          )
  }
      </div>
  
  
    )
}
