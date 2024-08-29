import React from 'react'
import {RiCloseLine} from "react-icons/ri"
import './modal.css'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Modal({setModalOpen}) {

    const navigate = useNavigate()
  return (
     
     <div className='darkBg' onClick={()=> setModalOpen(false)}>
        <div className='centered'>
        <div className='modal'>
        <div className='modalHeader'>
            <h5 className='heading'>Confirm</h5>
        </div>

        <button className='closeBtn' onClick={()=> setModalOpen(false)} >
            <RiCloseLine></RiCloseLine>
        </button>

        <div className='modalContent'>
            Log Out?
        </div>

        <div className='modalActions'>
            <div className='actionsContainer'>
                <div className='logOutBtn' onClick={() => {
                    setModalOpen(false)
                    localStorage.clear()
                    navigate("/login")
                }}>Log Out</div>
                <div className='cancelBtn' onClick={()=> setModalOpen(false)}>Cancel</div>
            </div>
        </div>
    </div>
    </div>
    </div>
    
    
  )
}
