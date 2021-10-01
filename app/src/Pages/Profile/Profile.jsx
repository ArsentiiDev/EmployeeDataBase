import React from 'react'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import './profile.css'

export default function Profile() {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                    <div className="profileCover">
                    <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
                        <img className="profileUserImg" src="assets/person/7.jpeg" alt="" />
              
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Solomon Keyn</h4>
                        <span className="profileInfoDesc">Salam</span>
                    </div>
                              </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile/>
                    </div>
                </div>

            </div>

        </>
    )
}
