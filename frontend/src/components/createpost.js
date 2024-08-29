import {React, useState, useEffect} from 'react'
import './createpost.css'
import { toast } from 'react-toastify'; 
import { Link , useNavigate} from 'react-router-dom'

export default function CreatePost() {

    var picture = "https://cdn-icons-png.flaticon.com/128/552/552721.png"

    //toast functions
    const notifyA=(msg)=>toast.error(msg)
    const notifyB=(msg)=>toast.success(msg) 

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(url)
        {
            fetch("http://localhost:5000/api/post/addpost",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body:url
            })
        }).then(res => res.json())
        .then(data => {
            if(data.err)
            {
                notifyA(data.error);
            }
            else
            {
                notifyB("Succesfully Posted")
                navigate("/");
            }})
        .catch(err => console.log(err))
        }
    }, [url])
    

    const postDetail = () => {
        console.log(title,image);

        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","safebook");
        data.append("clous_name","lambogoat");
        fetch("https://api.cloudinary.com/v1_1/lambogoat/image/upload",{
            method :"post",
            body : data
        }).then(res=>res.json())
        .then(data => setUrl(data.url))
        .catch(err => console.log(err));

        console.log(url);

    }

    const loadfile = (event) => {
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
          URL.revokeObjectURL(output.src); // free memory
        };
      };

  return (
    <div className='createPost'>
        <div className='post-header'>
            <h4 style={{margin:"3px auto"}}>Create new post</h4>
            <button id='post-btn' onClick={() => {postDetail()}}>Share</button>
        </div>

        <div className='main-div'>
        <img id="output" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"/>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        />
        </div>

        <div className='details'>
            <div className='card-header'>
                <div className='card-pic'>
                    <img
                        src={JSON.parse(localStorage.getItem("user")).photo ? JSON.parse(localStorage.getItem("user")).photo : picture}
                        alt=""
                        />
                </div>
                <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>
            </div>

            <textarea type='text' placeholder='Add a caption' value={title} onChange={(e) => {setTitle(e.target.value)}}></textarea>
        </div>
    </div>
  )
}
