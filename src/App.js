import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Projects from './pages/Projects'
import Create from './pages/Create'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'


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
          </Switch>
          
        </Layout>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
