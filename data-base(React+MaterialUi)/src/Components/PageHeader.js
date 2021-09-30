import React from 'react'
import {Card, Paper, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => {
    return {
        root: {
            backgroundColor: "#fdfdff"
        },
        pageHeader: {
            padding: theme.spacing(4),
            display:"flex",
            marginBottom: theme.spacing(2)
        },
        pageIcon: {
            display:"inline-block",
            padding: theme.spacing(2),
            color: "#3c44b1"
        },
        pageTitle: {
            paddingLeft: theme.spacing(4)
        },


    }
})

export default function PageHeader(props) {

    const classes = useStyles()

    const { title, subTitle, icon} = props
    return (
        <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
            <Card className={classes.pageIcon}>
                {icon}
            </Card>
            <div className={classes.pageTitle}>
                <Typography varian="h6" component="div">
                    {title}
                </Typography>
                <Typography varian="body1" component="div" style={{opacity:"0.5"}}>
                    {subTitle}
                </Typography>
            </div>

        </div>
            
        </Paper>
    )
}
