import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import ProjectCard from '../components/ProjectCard'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root:{
    display:"flex",
    flexDirection:"column",
  },
  wrapper:{
    display: "flex",
    flexDirection:"row",
    flexWrap:"wrap",
    alignContent:"space-around",
    justifyContent:"space-between"
  },
  card:{
    margin:20,
    maxWidth:"360px"
  }

})

export default function Data() {
  const [project, setProject] = useState([]);
  const classes = useStyles()

  useEffect(() => {
    fetch('http://localhost:8000/data')
      .then(res => res.json())
      .then(data => setProject(data.projects))
      
      
  }, [])
  
  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/data/' + id, {
      method: 'DELETE'
    })
    const newData = project.filter(data => data.id !== id)
    setProject(newData)
  }


  return (
    <Container className={classes.root}>
      <div className={classes.wrapper}>
        {project.map( data => (
          <div key={data.id} className={classes.card}>
            <ProjectCard data={data} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </Container>
  )
}
