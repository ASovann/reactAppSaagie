import React from 'react'
import { useState } from "react"
import { makeStyles } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { format } from 'date-fns'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@material-ui/icons'
import { ChevronLeft } from '@material-ui/icons'
import { ChevronRight } from '@material-ui/icons'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import MainLogo from "../media/logo_white_440x440.png"
import "../styles/LogoStyle.css"

import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    title: {
      padding: theme.spacing(2),
    },
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({ children }) {

  // Define the update method for loading
  const [loading, setLoading] = useState(true)
  const [erroring, setErroring] = useState(false)
  const [errMess, setErrMess] = useState("")
  
  
  const theme = useTheme()
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: 'Projects', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/' 
    },
    {
      text: 'Create Projects', 
      icon: <AddCircleOutlineOutlined color="secondary" />, 
      path: '/create' 
    },
  ];

  setTimeout(() => {setLoading(false)}, 800)
  // setTimeout(() => {setErroring(false)}, 500)
  // Display "Loading.. " message to the screen while waiting for the api return to load
  //if (loading) return <LoadingComponent/>
  //if (erroring) return <ErrorComponent errMess={errMess} />
  //if (erroring) return <ErrorComponent errMess={errMess} />

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>

          

          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Saagie</Typography>
          <Avatar className={classes.avatar} src="/mario-av.png" />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            justifyContent: 'space-between',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

        <div className='DrawerTop'>
        <DrawerHeader>
          <Typography variant="h5" className={classes.title}>
            Saagie App
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        </div>
        <div className='DrawerBottom'>
          <img src={MainLogo} alt="Logo"  className='logoImg'/>
        </div>
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        {loading ?  <LoadingComponent/> : (erroring ?  <ErrorComponent errMess={errMess} /> : children)}
        {/* {erroring ?  <ErrorComponent errMess={errMess} /> : null} */}
        {/* { children } */}
      </Main>
    </Box>
  )
}
