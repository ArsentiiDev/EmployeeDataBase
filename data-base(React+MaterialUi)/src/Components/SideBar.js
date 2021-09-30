import { makeStyles } from '@material-ui/core'
import React from 'react'

//withStyles & makeStyles

const useStyles = makeStyles ({
    sideMenu: {
        display:"flex",
        flexDirection:"column",
        position:"absolute",
        left:"0px",
        width:"320px",
        height:"100vh",
        backgroundColor:"#253053"
    }
})


export default function SideBar() {

    const classes = useStyles()

    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}
