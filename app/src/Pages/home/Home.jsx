import React from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import './home.css'

export default function Home() {
    return (
        <>
            <Topbar/>
            <div className="homeContainer">
            <Sidebar />
            <Feed/>
            <Rightbar/>
            </div>  
        
        </>
    )
}
