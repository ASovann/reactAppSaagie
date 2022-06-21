import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import ProjectCard from '../components/ProjectCard'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root:{
    display:"flex",
    flexDirection:"column"
  },
  wrapper:{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)"
  },
  card:{
    margin:20
  }

})

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const classes = useStyles()

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }


  return (
    <Container className={classes.root}>
      <div className={classes.wrapper}>
        {notes.map(note => (
          <div key={note.id} className={classes.card}>
            <ProjectCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </Container>
  )
}
