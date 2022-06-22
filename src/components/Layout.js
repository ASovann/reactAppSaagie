import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { styled } from '@mui/material/styles';
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
    },
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  }
})

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


export default function Layout({ children }, props) {

  // Define the update method for loading
  const [loading, setLoading] = useState(true)
  const [erroring, setErroring] = useState(false)
  const [errMess, setErrMess] = useState("")
  const theme = useTheme()
  const { window } = props;
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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


  const drawer = (
    <div>
      <DrawerHeader>
            <Typography variant="h5" className={classes.title}>
              Saagie App
            </Typography>
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
  )
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            size="large"
          >
            <Menu />
          </IconButton>

          

          <Typography className={classes.date}>
            {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </Typography>
          <Typography variant="h5" className={classes.title}>Saagie</Typography>
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
