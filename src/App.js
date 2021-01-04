import React,{useEffect,useState} from "react";
import {Container,AppBar,Typography,Grow,Grid,Button,Menu,MenuItem} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {getPosts} from './actions/posts';
import Form from './components/Form/Form';
import Posts from './components/Postes/Posts';
import LoginForm from './components/Form/Login'
import useStyle from './styles';
import memories from './images/memories.jpg';

const App=()=> {
  const [currentId,setCurrentId]=useState(null);
  const [token,setToken]=useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes=useStyle();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className="App">
          <Container maxWidth="lg" >
            <AppBar className={classes.appBar} position="static" color="inherit">
              <Grid item xs={12} sm={10} >
                <Typography className={classes.heading} variant="h2" align="left">Memories
                &nbsp;&nbsp;<img className={classes.image} src={memories} alt="memories" height="60" />
                </Typography>              
                
              </Grid>
              <Grid item xs={12} sm={2} >
                <Button  className={classes.buttonSubmit} 
                          variant="contained" 
                          color="primary"
                          size="large" 
                          aria-controls="simple-menu" 
                          aria-haspopup="true" 
                          onClick={handleClick}
                  >
                  Open Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem><Link to='/'>Home</Link></MenuItem>
                  {!token?
                       <MenuItem><Link to='/login'>Login</Link></MenuItem>
                      :<MenuItem onClick={()=>setToken(null)}>Logout</MenuItem>
                  }
                </Menu>                
              </Grid>              
            </AppBar>
            <Switch> 
              <Route path="/" exact>
                <Grow in>
                  <Container>
                      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                          <Grid item xs={12} sm={7} >
                              <Posts token={token} setCurrentId={setCurrentId} />
                          </Grid>
                          <Grid item xs={12} sm={4} >
                              <Form currentId={currentId} setCurrentId={setCurrentId}/>                              
                          </Grid>                      
                      </Grid>
                  </Container>
                </Grow>  
              </Route>   
             {!token && <Route path="/login" render={({ match }) => <LoginForm setToken={setToken}/>}/>}
            </Switch>            
          </Container>
      </div>
    </Router>
  );
}

export default App;
