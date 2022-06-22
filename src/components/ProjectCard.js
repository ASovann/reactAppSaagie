import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { yellow, green, pink, blue } from '@material-ui/core/colors'
import Box from '@mui/material/Box';
import { SearchOutlined } from '@material-ui/icons'
import { useHistory,  } from 'react-router-dom'


const useStyles = makeStyles({
  avatar: {
    backgroundColor: (data) => {
      if (data.creator === 'work') {
        return yellow[700]
      }
      if (data.creator === 'money') {
        return green[500]
      }
      if (data.creator === 'todos') {
        return pink[500]
      }
      return blue[500]
    }
  },
  card:{
    borderRadius: 16
  },
  cardHeaderSubheader:{
    fontSize:"13px",
    color: (data) => {
      if (data.creator === 'work') {
        return yellow[700]
      }
      if (data.creator === 'money') {
        return green[500]
      }
      if (data.creator === 'todos') {
        return pink[500]
      }
      return blue[500]
    }
  },
  cardHeaderTitle:{
    fontWeight:"Bold"
  },
  cardFooter:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:10,
  },
  jobText:{
    
    fontSize:13,

  },
  statusText:{
    
    fontSize:14,
    color: (data) => {
      if(data.status ==='READY'){
        return green[500]
      }
    }
  }

})

export default function ProjectCard({ data, handleDelete }) {
  const history = useHistory()
  const classes = useStyles(data)

  return (
    <div>
      <Card elevation={1} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {data.creator.slice(0,2).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(data.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={<Typography className={classes.cardHeaderTitle}>{data.name}</Typography>}
          subheader={<Typography className={classes.cardHeaderSubheader}>{data.creator}</Typography>}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { data.description }
          </Typography>
          <Box className={classes.cardFooter}>
            <Typography className={classes.jobText}>Jobs: { data.jobsCount }</Typography>
            <Typography className={classes.statusText}>Status: { data.status }</Typography>
            <IconButton className={classes.iconButton} onClick={() => history.push('/project/' + data.id)}>
              <SearchOutlined />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}