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

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.creator === 'work') {
        return yellow[700]
      }
      if (note.creator === 'money') {
        return green[500]
      }
      if (note.creator === 'todos') {
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
    color: (note) => {
      if (note.creator === 'work') {
        return yellow[700]
      }
      if (note.creator === 'money') {
        return green[500]
      }
      if (note.creator === 'todos') {
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
    
    fontSize:13
  },
  statusText:{
    
    fontSize:14
  }

})

export default function ProjectCard({ note, handleDelete }) {
  const classes = useStyles(note)

  return (
    <div>
      <Card elevation={1} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.creator.slice(0,2).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={<Typography className={classes.cardHeaderTitle}>{note.name}</Typography>}
          subheader={<Typography className={classes.cardHeaderSubheader}>{note.creator}</Typography>}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { note.description }
          </Typography>
          <Box className={classes.cardFooter}>
            <Typography className={classes.jobText}>Jobs: { note.jobsCount }</Typography>
            <Typography className={classes.statusText}>Status: { note.status }</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}