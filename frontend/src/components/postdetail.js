import {React,useState,useRef} from 'react'
import './postdetail.css'
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
export default function PostDetail({item , user, toggleDetails}) {


    //console.log(item);

  var picture = "https://cdn-icons-png.flaticon.com/128/552/552721.png"

    const navigate = useNavigate();
    const [id, setId] = useState()
    const [comment, setComment] = useState("")
    const [caption, setCaption] = useState("")
    const [show, setShow] = useState(false)

    const toggleHidden=() => 
    {
      if(show)
      {
        setShow(false)
      }
      else
      {
        setShow(true)
      }
    }

    //toast functions
    const notifyA=(msg)=>toast.error(msg)
    const notifyB=(msg)=>toast.success(msg) 

    const deletePost=(postId)=>{
        
        setId(postId)
        if(window.confirm("Do you really want to delete this post"))
        {
            fetch(`http://localhost:5000/api/post/${postId}`,{
                method : "DELETE",
                headers : {
                    "authorization" : "Bearer "+localStorage.getItem("jwt")
                }
            }).then(res => res.json())
            .then((result) => {
                navigate('/')
                toggleDetails();
                notifyB("Post Deleted")
            })
        }
        
    };

    const editPost = (text,id) => {

      console.log(text);
      fetch(`http://localhost:5000/api/post/update/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json",
            "authorization" : "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            text:text
        })
    }).then(res => res.json())
    .then(result => {
        window.location.reload();
        notifyB("Post Updated")
    })
    };

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
        //console.log(result);
        window.location.reload();
        notifyB("Comment Posted")
      })
    }

  return (
    <div className='showComments'>
        <div className='container'>

          <div className='postPic'>
            <img src={item.body}></img>
          </div>

          <div className='details'>
          <div className='card-header' style={{borderBottom : "1px solid #00000029"}}>
          <div className='card-pic'>
            <img src={user.photo ? user.photo : picture}>

            </img>
          </div>
          <h5>{user.username}</h5>

          {
            item.user._id == JSON.parse(localStorage.getItem("user"))._id ? (
              <>
                <div className='deletePost'>
                  <span class="material-symbols-outlined" onClick={() => {deletePost(item._id)}}>
                    delete
                    </span>
                
                  </div>

                  <div>
                    <div className='editPost'>
                    <span class="material-symbols-outlined" onClick={() => {toggleHidden()}}>
                      edit
                      </span>
                      </div>

                      {show && <div className='editing'>
                      <input  type='text' className='newcaption' placeholder='Write new caption' onChange={(e) => {setCaption(e.target.value)}}></input>
                      <button className='btn' onClick={() => {
                        editPost(caption,item._id);
                        toggleHidden()
                        }}>Change</button>

<div className='close-editing'>
          <span class="material-symbols-outlined material-symbols-outlined-editing" onClick={() => {toggleHidden()}}>
          close
          </span>
        </div>
                      </div>
}

                      </div>
              </>
            ):
            (
              <>
              </>
            )
          }


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
            }}>Post</button>
        </div>

          </div>
        </div>

        <div className='close-comment'>
          <span class="material-symbols-outlined material-symbols-outlined-comment" onClick={() => {toggleDetails()}}>
          close
          </span>
        </div>

        
      </div>
  )
}
