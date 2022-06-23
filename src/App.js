import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Projects from './pages/Projects'
import Create from './pages/Create'
import DetailsProject from './pages/DetailsProject'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'
import axios from 'axios'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  const [noToken, setNoToken] = useState(localStorage.getItem("token") === null)

  useEffect(() => {
    if(noToken){
      console.log("ok cool");
      axios.post('http://localhost:4000/api/signin', {"login":"ESTIAM_G03_cristian.tirche","password":"PasDePanneau123"})
      .then(res => localStorage.setItem("token", res.data.token))
    } else {
      setNoToken(false);
    }
  }, [noToken])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Projects />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/project/:id">
              <DetailsProject />
            </Route>
          </Switch>
          
        </Layout>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
