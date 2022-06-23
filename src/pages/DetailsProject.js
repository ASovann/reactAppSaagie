import React,  { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography'
import { Tab } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    main:{
        display:"flex",
        flexDirection:"column"
    },
    tabsHeader:{
        borderBottom:1,
        borderColor: 'divider'
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Pipelines = (props) => {
    const { pipeline } = props;
    const elements = [];
    for(let key in pipeline){
        let value = pipeline[key]
        //console.log("key: ",key, " value: ", value)
        if(typeof value === 'object'){
            console.log("key: ",key, " value: ", value)
            elements.push(<Pipelines key={uuidv4()} pipeline={value}/>)
            elements.push(<span key={uuidv4()}> {key} : {value !== null ? value.toString() : <span>No {key}</span>}</span>)
        }else if(typeof value === 'array'){
            if (value[0] && typeof value[0] === "object") {
                elements.push(...value.map((val) => (<Pipelines key={uuidv4()} pipeline={val}/>)))
            } else {
                elements.push(<span key={uuidv4()}>{key} : {value}</span>)
            }
        
        } else {
            //console.log("key: ",key, " value: ", value)
            elements.push(<span key={uuidv4()}> {key} : {value !== '' ? value.toString() : <span>No {key}</span>}</span>)
        }
        
    }
    return(
        
        <>{elements.map((element) => (<div key={uuidv4()}>{element}<br/></div>))}</>
        
    )
}

const Jobs = (props) => {
    const { job } = props;
    const elements = [];
    for(let key in job){
        let value = job[key]
        if(typeof value === 'object'){
            elements.push(<Jobs key={uuidv4()} job={value}/>)
            elements.push(<span key={uuidv4()}> {key} : {value !== null ? value.toString() : <span>No {key}</span>}</span>)
        }else if(typeof value === 'array'){
            if (value[0] && typeof value[0] === "object") {
                elements.push(...value.map((val) => (<Jobs key={uuidv4()} pipeline={val}/>)))
            } else {
                elements.push(<span key={uuidv4()}>{key} : {value !== '' ? value.toString() : <span>No {key}</span>}</span>)
            }
        } else {
            elements.push(<span key={uuidv4()}> {key} : {value !== '' ? value.toString() : <span>No {key}</span>}</span>)
        }
    }
    
    return(
        <>{elements.map((element) => (<div key={uuidv4()}>{element}<br/></div>))}</>
        
    )
}

const Apps = (props) => {
    const { app } = props;
    const elements = [];
    for(let key in app){
        let value = app[key]
        if(typeof value === 'object'){
            elements.push(<Apps key={uuidv4()} app={value}/>)
            elements.push(<span key={uuidv4()}> {key} : {value !== null ? value.toString() : <span>No {key}</span>}</span>)
        }else if(typeof value === 'array'){
            if (value[0] && typeof value[0] === "object") {
                elements.push(...value.map((val) => (<Apps key={uuidv4()} pipeline={val}/>)))
            } else {
                elements.push(<span key={uuidv4()}>{key} : {value !== '' ? value.toString() : <span>No {key}</span>}</span>)
            }
        } else {
            elements.push(<span key={uuidv4()}> {key} : {value !== '' ? value.toString() : <span>No {key}</span>}</span>)
        }
    }
    
    return(
        <>{elements.map((element) => (<div key={uuidv4()}>{element}<br/></div>))}</>
        
    )
}



export default function DetailsProject() {
    const classes = useStyles()
    const [project, setProject] = useState([]);
    const [pipelines, setPipelines] = useState([])
    const [jobs, setJobs] = useState([])
    const [apps, setApps] = useState([])
    let { id } = useParams();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/project/' + id)
          .then(res => {
              return res.data.data
        })
          .then(data => {
                console.log("data: ",data)
              setProject(data.project)
              setPipelines(data.project.pipelines)
              
              setJobs(data.jobs)
              setApps(data.labWebApps)
            })
      }, [])
    return(
        <Box className={classes.main}>
            <Typography>{project.name}</Typography>
            <Typography>{project.id}</Typography>
            <Typography>{project.creator}</Typography>
            <Typography>{project.description}</Typography>
            <Typography>Status: {project.status}</Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Jobs" value="1" />
                        <Tab label="Pipelines" value="2" />
                        <Tab label="Apps" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {jobs.map((job) => (<div key={uuidv4()}><Jobs job={job}/><hr/></div>))}
                </TabPanel>
                <TabPanel value="2">
                    
                    {pipelines.map((pipeline) => (<div key={uuidv4()}><Pipelines pipeline={pipeline}/><hr/></div>))}
                </TabPanel>
                <TabPanel value="3">
                    {apps.map((app) => (<div key={uuidv4()}><Apps app={app}/><hr/></div>))}
                </TabPanel>
            </TabContext>
        </Box>
    )
}