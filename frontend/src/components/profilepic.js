import {React, useState, useEffect, useRef} from 'react'

export default function ProfilePic({changeprofile}) {

    const hidden = useRef(null)
    const handleClick=()=>{
        hidden.current.click()
    }

    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    const postDetail = () => {
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

    useEffect(() => {

        if(image)
        {
            postDetail()
        }
    }, [image])
    
    useEffect(() => {
        
        if(url)
        {
            postPic();
        }
    }, [url])
    
    const postPic = () => {
        fetch("http://localhost:5000/api/user/changeprofilepic",{
            method:"PUT",
            headers:{
                "Content-Type" : "application/json",
                "authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                pic:url
            })
        }).then(res => res.json())
        .then(data => {
            changeprofile()
            window.location.reload();
            console.log(data)
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='profilePic darkBg'>
        <div className='changePic centered'>
            <div>
                <h2>
                    Change Profile Pic
                </h2>
            </div>

            <div style={{borderTop:"1px solid #00000029"}}> 
                <button className='upload-btn' onClick={handleClick}>Upload Photo</button>
                <input ref={hidden} type='file' accept='image/*' style={{display: "none"}} onChange={(e) => setImage(e.target.files[0])}></input>
            </div>

            <div style={{borderTop:"1px solid #00000029"}}>
                <button className='upload-btn' onClick={() => {
                    setUrl(null)
                    postPic()
                }}>Remove Current Photo</button>
            </div>

            <div style={{borderTop:"1px solid #00000029"}}>
                <button style={{
                    border:"none",
                    background:"none",
                    cursor:"pointer",
                    fontSize:"15px",
                    color:"black"
                }} onClick={changeprofile}>Cancel</button>
            </div>
        </div>
    </div>

  )
}
