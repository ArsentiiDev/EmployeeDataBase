import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        top:theme.spacing(9)
    }
}))

export default function Notification(props) {

    const {notify, setNotify} = props
    const classes = useStyles()

    const handleClose = (e,reason) => {
        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return (
        <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={1000}
        anchorOrigin={{vertical:'top',horizontal:'right'}}
        onClose={handleClose}>
            <Alert
            onClose={handleClose}
            severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
